import { MAX_FILE_SIZE } from "../core/constants";
import { pushStandaloneSnapshot } from "../core/state";
import { getEditorRoot } from "./root";

function createModal(doc: Document) {
  const overlay = doc.createElement("div");
  overlay.className = "st-re-img-modal-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");

  const modal = doc.createElement("div");
  modal.className = "st-re-img-modal";

  const title = doc.createElement("h3");
  title.textContent = "Edit image";

  const tabs = doc.createElement("div");
  tabs.className = "st-re-img-tabs";

  const uploadBtn = doc.createElement("button");
  uploadBtn.type = "button";
  uploadBtn.textContent = "Upload file";
  uploadBtn.className = "active";

  const urlBtn = doc.createElement("button");
  urlBtn.type = "button";
  urlBtn.textContent = "Image URL";

  tabs.appendChild(uploadBtn);
  tabs.appendChild(urlBtn);

  const uploadPane = doc.createElement("div");
  uploadPane.className = "st-re-img-pane st-re-img-pane-upload";
  const fileInput = doc.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  // Ensure the input fits inside the modal
  fileInput.style.width = "100%";
  fileInput.style.boxSizing = "border-box";
  uploadPane.appendChild(fileInput);
  const uploadMsg = doc.createElement("div");
  uploadMsg.className = "st-re-img-msg";
  uploadPane.appendChild(uploadMsg);

  const urlPane = doc.createElement("div");
  urlPane.className = "st-re-img-pane st-re-img-pane-url";
  urlPane.style.display = "none";
  const urlInput = doc.createElement("input");
  urlInput.type = "url";
  urlInput.placeholder = "https://example.com/image.jpg";
  // Ensure the input fits inside the modal
  urlInput.style.width = "100%";
  urlInput.style.boxSizing = "border-box";
  urlPane.appendChild(urlInput);
  const urlMsg = doc.createElement("div");
  urlMsg.className = "st-re-img-msg";
  urlPane.appendChild(urlMsg);

  const actions = doc.createElement("div");
  actions.className = "st-re-img-actions";
  const cancel = doc.createElement("button");
  cancel.type = "button";
  cancel.textContent = "Cancel";
  const apply = doc.createElement("button");
  apply.type = "button";
  apply.textContent = "Apply";
  apply.className = "primary";
  actions.appendChild(cancel);
  actions.appendChild(apply);

  modal.appendChild(title);
  modal.appendChild(tabs);
  modal.appendChild(uploadPane);
  modal.appendChild(urlPane);
  modal.appendChild(actions);
  overlay.appendChild(modal);

  // Tab behavior
  uploadBtn.addEventListener("click", () => {
    uploadBtn.classList.add("active");
    urlBtn.classList.remove("active");
    uploadPane.style.display = "block";
    urlPane.style.display = "none";
  });
  urlBtn.addEventListener("click", () => {
    urlBtn.classList.add("active");
    uploadBtn.classList.remove("active");
    uploadPane.style.display = "none";
    urlPane.style.display = "block";
  });

  return {
    overlay,
    fileInput,
    uploadMsg,
    urlInput,
    urlMsg,
    cancel,
    apply,
  };
}

function validateUrl(u: string): boolean {
  try {
    const url = new URL(u);
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;
    return true;
  } catch {
    return false;
  }
}

export function openImageEditor(
  doc: Document,
  img: HTMLImageElement,
  onClose?: (applied: boolean) => void,
) {
  const existing = doc.querySelector(".st-re-img-modal-overlay");
  if (existing) return;
  const { overlay, fileInput, uploadMsg, urlInput, urlMsg, cancel, apply } =
    createModal(doc);

  let applied = false;
  function close() {
    overlay.remove();
    onClose?.(applied);
  }

  // File input handler
  fileInput.addEventListener("change", () => {
    uploadMsg.textContent = "";
    const f = fileInput.files && fileInput.files[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      uploadMsg.textContent = "Invalid file type";
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      uploadMsg.textContent = "File is larger than 1 MB";
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => {
      uploadMsg.textContent = "Failed to read file";
    };
    reader.onload = () => {
      const result = reader.result as string | null;
      if (!result) {
        uploadMsg.textContent = "Failed to read file";
        return;
      }
      img.src = result;
      applied = true;
      try {
        pushStandaloneSnapshot();
      } catch {
        /* ignore snapshot errors */
      }
      close();
    };
    reader.readAsDataURL(f);
  });

  // URL apply handler
  apply.addEventListener("click", async () => {
    urlMsg.textContent = "";
    const val = urlInput.value.trim();
    if (val) {
      if (!validateUrl(val)) {
        urlMsg.textContent = "Enter a valid http/https URL";
        return;
      }
      // Try to fetch HEAD to validate content-type/length (best-effort, may fail due to CORS)
      try {
        const head = await fetch(val, { method: "HEAD" });
        const ct = head.headers.get("content-type");
        const cl = head.headers.get("content-length");
        if (ct && !ct.startsWith("image/")) {
          urlMsg.textContent = "URL does not point to an image";
          return;
        }
        if (cl && Number(cl) > MAX_FILE_SIZE) {
          urlMsg.textContent = "Image appears larger than 1 MB";
          return;
        }
        // OK — apply URL
        img.src = val;
        applied = true;
        try {
          pushStandaloneSnapshot();
        } catch {
          /* ignore snapshot errors */
        }
        close();
        return;
      } catch {
        // If HEAD fails (CORS), still allow setting the URL — leave a soft warning
        img.src = val;
        applied = true;
        try {
          pushStandaloneSnapshot();
        } catch {
          /* ignore snapshot errors */
        }
        close();
        return;
      }
    } else {
      // No URL entered — just close
      close();
    }
  });

  cancel.addEventListener("click", () => close());

  // Basic keyboard handling: Escape closes
  overlay.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  // Insert overlay inside the editor root so global template CSS doesn't affect modal UI
  try {
    const root = getEditorRoot(doc);
    root.appendChild(overlay);
  } catch {
    doc.body.appendChild(overlay);
  }
  (fileInput as HTMLInputElement).focus();
}

export default {};
