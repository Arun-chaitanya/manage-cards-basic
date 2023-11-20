import { cloneDeep } from "lodash";
import { useSnackbar } from "notistack";
import { useState } from "react";

import useBreakpoint from "@hooks/useBreakpoint";

import Button from "@components/Button";
import InputLabel from "@components/InputLabel";
import InputText from "@components/InputText";
import Modal from "@components/Modal";
import Title from "@components/Title";

import { CardType } from "../../pages/cards";
import styles from "./AddCardModal.module.scss";

const AddCardModal: React.FC<AddCardModalProps> = ({
  open,
  onClose,
  cardsData,
  setCardsData,
  activeTab,
  activeIndex,
}) => {
  const [cardNumber, setCardNumber] = useState<number>();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const isMobile = useBreakpoint({ max: "sm" });
  const { enqueueSnackbar } = useSnackbar();

  const handleAddCard = () => {
    if (cardNumber?.toString().length !== 16) {
      return enqueueSnackbar("The card number should have a length of 16 numbers", { variant: "error" });
    }
    if (!firstName.length) {
      return enqueueSnackbar("Please enter valid first name", { variant: "error" });
    }
    if (!lastName.length) {
      return enqueueSnackbar("Please enter valid last name", { variant: "error" });
    }
    const cards = cloneDeep(cardsData);
    let list = activeTab === "My debit cards" ? cards.myCards : cards.companyCards;
    if (activeIndex > -1 && list?.length) {
      list = [
        ...list,
        {
          cardNumber: cardNumber?.toString(),
          cardName: `${firstName} ${lastName}`,
          isFreezed: false,
          expiry: "12/20",
          cvv: 123,
        },
      ];
    }
    const obj = {
      myCards: activeTab === "My debit cards" ? list : cards.myCards,
      companyCards: activeTab === "My debit cards" ? cards.companyCards : list,
    };
    localStorage.setItem("CARD_DATA", JSON.stringify(obj));
    setCardsData(obj);
    setCardNumber(undefined);
    setFirstName("");
    setLastName("");
    onClose();
  };

  const isNumber = (input) => {
    const numberRegex = /^[0-9]+$/;
    return numberRegex.test(input);
  };

  function containsOnlyAlphabets(input) {
    const alphabetRegex = /^[a-zA-Z]+$/;
    return alphabetRegex.test(input);
  }

  const handleCardNumber = (e) => {
    if (isNumber(e.target.value)) {
      setCardNumber(e.target.value);
    }
  };

  const handleFirstName = (e) => {
    if (containsOnlyAlphabets(e.target.value)) {
      setFirstName(e.target.value);
    }
  };

  const handleLastName = (e) => {
    if (containsOnlyAlphabets(e.target.value)) {
      setLastName(e.target.value);
    }
  };

  return (
    <Modal
      open={open}
      showHeader={false}
      className={styles.modal}
      classes={{ body: isMobile ? "" : "ph20" }}
      onClose={onClose}
    >
      <div className="mb20 flex align-center justify-between">
        <Title color="dark" variant={isMobile ? "h4" : "h1"}>
          Add Card
        </Title>
      </div>
      <InputLabel>Card Number</InputLabel>
      <InputText
        value={cardNumber}
        onChange={handleCardNumber}
        error={(cardNumber || "")?.toString().length > 16 ? "Card Number Length should be 16 digits" : ""}
      />
      <InputLabel className="mt20">
        First Name
      </InputLabel>
      <InputText value={firstName} onChange={handleFirstName} />
      <InputLabel className="mt20">
        Last Name
      </InputLabel>
      <InputText className="mb20" value={lastName} onChange={handleLastName} />
      <Button fullWidth onClick={handleAddCard}>
        Add Card
      </Button>
    </Modal>
  );
};

type AddCardModalProps = {
  open: boolean;
  onClose: () => void;
  cardsData: { myCards?: CardType[]; companyCards?: CardType[] };
  setCardsData: (cardsData: { myCards?: CardType[]; companyCards?: CardType[] }) => void;
  activeTab: string;
  activeIndex: number;
};

export default AddCardModal;
