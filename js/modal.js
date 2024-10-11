document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("appointment");
  const closeBtn = modal.querySelector(".btn-close");
  let modalShown = false;

  function showModal() {
    if (!modalShown) {
      modal.classList.add("show");
      modal.style.display = "block";
      modalShown = true;
    }
  }

  function hideModal() {
    modal.classList.remove("show");
    modal.style.display = "none";
    modalShown = false;
  }
  setInterval(showModal, 10000);

  closeBtn.addEventListener("click", hideModal);

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      hideModal();
    }
  });
});
