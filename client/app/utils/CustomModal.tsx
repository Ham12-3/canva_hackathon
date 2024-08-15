import React, { FC } from "react";

import { Modal, Box } from "@mui/material";

type Props = {
  open: boolean;

  setOpen: (open: boolean) => void;

  activeItem: any;
  component: any;
  setRoute?: (route: string) => void;
};

const CustomModal: FC<Props> = ({
  open,
  setOpen,
  setRoute,
  component: Component,
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-[50%] -translate-x-1/2 -translate-y-/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none"></Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
