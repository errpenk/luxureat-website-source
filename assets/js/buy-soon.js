document.addEventListener("click", (event) => {
  if (!event.target.closest("[data-buy-soon]")) return;
  const zh = document.documentElement.lang?.startsWith("zh");
  const dialog = document.createElement("dialog");
  dialog.className = "lux-buy-soon-dialog";
  dialog.tabIndex = -1;
  const message = document.createElement("p");
  message.append(zh
    ? "在线购买功能即将上线，感谢您的支持！您可以先联系我们获取"
    : "Online purchasing is coming soon. Thank you for your support! Contact us for ");
  const contact = document.createElement("a");
  const url = new URL(document.querySelector('.lux-nav a[href$="/contact/"], .lux-nav a[href$="contact.html"]')?.href || (zh ? "/contact/" : "/en/contact/"), location.href);
  url.hash = "brand-consultation";
  contact.href = url.href;
  contact.textContent = zh ? "专属服务" : "personal service";
  message.append(contact, zh ? "。" : ".");
  const close = document.createElement("button");
  close.type = "button";
  close.textContent = zh ? "关闭" : "Close";
  close.onclick = () => dialog.close();
  dialog.onclose = () => dialog.remove();
  dialog.append(message, close);
  document.body.append(dialog);
  dialog.showModal();
  dialog.focus();
});
