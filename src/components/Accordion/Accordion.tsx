import clsx from "clsx";
import { useState } from "react";

import Collapse from "@mui/material/Collapse";

import Image from "@components/Image";
import Text from "@components/Text";

import downArrow from "@icons/DownArrow.svg";

import styles from "./Accordion.module.scss";

const Accordion: React.FC<AccordionProps> = (props) => {
  const { id, children, isToggled, variant, text, classes, icon, handleToggle: handleToggleProp } = props;

  const [toggled, setToggled] = useState(isToggled);

  const handleToggle = () => {
    setToggled((prevState) => !prevState);
    handleToggleProp && handleToggleProp();
  };

  return (
    <summary className={styles.root} data-testid="accordion">
      <div
        id={id}
        role="button"
        className={clsx(styles.accordion, variant && styles[variant], toggled && styles.active, classes?.body)}
        onClick={handleToggle}
        data-testid="accordion-button"
      >
        <div className="flex align-center gap15">
          {icon && <Image src={icon} height={20} width={20} />}
          {text && <Text color="primary-color">{text}</Text>}
        </div>

        <span className={clsx(styles.icon, toggled && styles.toggled)}>
          <Image src={downArrow} height={20} width={20} />
        </span>
      </div>

      <Collapse in={toggled} data-testid="accordion-content">
        <div className={clsx(styles.content, classes?.content)}>{children}</div>
      </Collapse>
    </summary>
  );
};

Accordion.defaultProps = {
  isToggled: false,
  variant: "normal",
};

type AccordionProps = React.PropsWithChildren<{
  id?: string;
  text?: string;
  isToggled?: boolean;
  variant?: "normal";
  titleVariant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  event?: string;
  eventData?: Record<string, any>;
  classes?: { body?: string; content?: string };
  icon?: string;
  handleToggle?: () => void;
}>;

export default Accordion;
