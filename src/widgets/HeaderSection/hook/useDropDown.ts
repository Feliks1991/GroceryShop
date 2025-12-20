import { useRef, useState } from "react";

type useDropDownControl = {
  visible: boolean;
  open: () => void;
  close: () => void;
  closeCanceling: () => void;
};

const useDropDown = (): useDropDownControl => {
  const [visible, setVisible] = useState(false);
  const timeoutOpen = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeoutClose = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = () => {
    if (timeoutClose.current) clearTimeout(timeoutClose.current);
    timeoutOpen.current = setTimeout(() => {
      setVisible(true);
    }, 300);
  };

  const close = () => {
    if (timeoutOpen.current) clearTimeout(timeoutOpen.current);
    timeoutClose.current = setTimeout(() => {
      setVisible(false);
    }, 500);
  };
  const closeCanceling = () => {
    if (timeoutClose.current) clearTimeout(timeoutClose.current);
  };

  return { open, close, closeCanceling, visible };
};

export default useDropDown;
