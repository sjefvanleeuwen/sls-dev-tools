import { Box } from "../components/box";
import { ModalLayout } from "../components/modalLayout";
import { ModalTitle } from "../components/modalTitle";
import { Loader } from "../components/loader";

const disableRelayModal = (screen, application) => {
  const disableRelayLayout = new ModalLayout(screen, 112, 20, true);

  const numBoxes = 2;
  let currentBox = 0;
  const boxes = [];

  const unselectButton = (index) => {
    boxes[index].style.border.fg = "green";
    boxes[index].style.fg = "green";
  };

  const selectButton = (index) => {
    boxes[index].style.border.fg = "yellow";
    boxes[index].style.fg = "yellow";
  };

  const closeModal = () => {
    application.setIsModalOpen(false);
    application.returnFocus();
    disableRelayLayout.destroy();
  };

  new ModalTitle(disableRelayLayout, 110, "Disable Relay?");

  new Box(
    disableRelayLayout,
    110,
    4,
    "Do you want to disable Relay mode for this function?"
  );

  const confirmButton = new Box(disableRelayLayout, 110, 4, "Disable Relay");
  const dismissButton = new Box(disableRelayLayout, 110, 4, "Cancel");

  boxes.push(confirmButton);
  boxes.push(dismissButton);

  new Box(
    disableRelayLayout,
    110,
    4,
    "Use the arrow keys and ENTER to select option\nESC to close"
  );

  disableRelayLayout.focus();

  selectButton(currentBox);

  disableRelayLayout.key(["enter"], () => {
    // If confirm selected, disable Relay layer
    if (currentBox === 0) {
      const loader = new Loader(screen, 5, 30);
      loader.load("Disabling Relay...");
      // Simulate remove layers API callback
      setTimeout(() => {
        application.setRelayActive(false);
        loader.stop();
        loader.destroy();
        console.log("Relay disabled");
        closeModal();
      }, 2000);
    } else {
      // Dismiss warning and allow user to quit
      closeModal();
    }
  });

  disableRelayLayout.key(["up"], () => {
    unselectButton(currentBox);
    currentBox -= 1;
    if (currentBox === -1) {
      currentBox = numBoxes - 1;
    }
    selectButton(currentBox);
  });
  disableRelayLayout.key(["down"], () => {
    unselectButton(currentBox);
    currentBox += 1;
    if (currentBox === numBoxes) {
      currentBox = 0;
    }
    selectButton(currentBox);
  });
  disableRelayLayout.key(["escape"], () => {
    // Discard modal
    closeModal();
  });
};

module.exports = {
  disableRelayModal,
};
