(() => {
  const lang = document.documentElement.lang?.startsWith("zh") ? "zh" : "en";
  const brand = window.LUXUREAT_BRAND_DATA?.[lang];
  if (brand) {
    document.querySelectorAll("[data-brand-field]").forEach((node) => {
      const value = brand[node.dataset.brandField];
      if (value) node.textContent = value;
    });
  }

  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const text = lang === "zh" ? {
    required: "请填写所有必填信息。",
    invalidEmail: "请输入有效的电子邮箱。",
    sending: "正在发送…",
    send: "发送信息",
    success: "信息已发送，我们会尽快与您联系。",
    failed: "暂时无法发送，请稍后再试。",
    opening: "正在打开您的邮件应用…",
    labels: ["姓名", "电话", "电子邮箱", "咨询内容"],
    notProvided: "未提供",
  } : {
    required: "Please complete all required fields.",
    invalidEmail: "Please enter a valid email address.",
    sending: "Sending…",
    send: "Send Message",
    success: "Your message has been sent. We will be in touch soon.",
    failed: "Your message could not be sent. Please try again later.",
    opening: "Opening your email app…",
    labels: ["Name", "Phone", "Email", "Message"],
    notProvided: "Not provided",
  };
  const feedback = form.querySelector("[data-contact-feedback]");
  const submit = form.querySelector('[type="submit"]');
  const field = (name) => form.elements.namedItem(name);

  const shake = (node) => {
    if (!node) return;
    node.classList.remove("is-shaking");
    void node.offsetWidth;
    node.classList.add("is-shaking");
  };
  const setFeedback = (message, success = false) => {
    feedback.textContent = message;
    feedback.classList.toggle("is-success", success);
    if (!success && message) shake(feedback);
  };
  const clearError = (name) => {
    const control = field(name);
    const error = form.querySelector(`[data-contact-error="${name}"]`);
    control?.closest(".relative")?.classList.remove("is-invalid");
    if (error) error.hidden = true;
  };
  const showError = (name) => {
    const control = field(name);
    const error = form.querySelector(`[data-contact-error="${name}"]`);
    control?.closest(".relative")?.classList.add("is-invalid");
    if (error) {
      error.hidden = false;
      shake(error);
    }
  };
  const validate = () => {
    let firstInvalid = null;
    ["name", "email", "inquiry_type", "message"].forEach((name) => {
      clearError(name);
      const control = field(name);
      if (!String(control?.value || "").trim()) {
        showError(name);
        firstInvalid ||= control;
      }
    });
    const email = field("email");
    if (email.value && !email.validity.valid) {
      showError("email");
      firstInvalid ||= email;
    }
    if (firstInvalid) {
      setFeedback(email === firstInvalid ? text.invalidEmail : text.required);
      firstInvalid.focus();
      return false;
    }
    setFeedback("");
    return true;
  };

  form.querySelectorAll("input, select, textarea").forEach((control) => {
    const clear = () => {
      clearError(control.name);
      if (feedback.textContent) setFeedback("");
    };
    control.addEventListener("input", clear);
    control.addEventListener("change", clear);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validate()) return;

    const data = new FormData(form);
    const subject = `${data.get("name")} + ${data.get("inquiry_type")} + ${data.get("phone")}`;
    const body = [
      `${text.labels[0]}：${data.get("name")}`,
      `${text.labels[1]}：${data.get("phone") || text.notProvided}`,
      `${text.labels[2]}：${data.get("email")}`,
      "",
      `${text.labels[3]}：`,
      data.get("message"),
    ].join("\n");
    const config = window.LuxureatContact;

    if (!config?.ajaxUrl || !config?.nonce) {
      setFeedback(text.opening, true);
      window.location.href = `mailto:errpenk@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    data.set("action", "luxureat_contact");
    data.set("nonce", config.nonce);
    data.set("lang", lang);
    submit.disabled = true;
    submit.textContent = text.sending;
    try {
      const response = await fetch(config.ajaxUrl, {
        method: "POST",
        credentials: "same-origin",
        body: data,
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.data?.message || text.failed);
      form.reset();
      setFeedback(result.data?.message || text.success, true);
    } catch (error) {
      setFeedback(error.message || text.failed);
    } finally {
      submit.disabled = false;
      submit.textContent = text.send;
    }
  });
})();
