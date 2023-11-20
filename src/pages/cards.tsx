import clsx from "clsx";
import { cloneDeep } from "lodash";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-grid-system";

import useBreakpoint from "@hooks/useBreakpoint";

import Accordion from "@components/Accordion";
import Button from "@components/Button";
import Carousel from "@components/Carousel";
import Image from "@components/Image";
import Layout from "@components/Layout";
import Modal from "@components/Modal";
import NavItem from "@components/NavItem";
import NavList from "@components/NavList";
import Text from "@components/Text";
import Title from "@components/Title";
import AddCardModal from "@views/AddCardModal";

import cancelCard from "@icons/CancelCard.svg";
import cardDetails from "@icons/CardDetails.svg";
import cardLogo from "@icons/CardLogo.svg";
import cardTransactions from "@icons/CardTransactions.svg";
import cardWhite from "@icons/CardWhite.svg";
import eyeLogo from "@icons/Eye.svg";
import fileStorage from "@icons/FileStorage.svg";
import freezeCard from "@icons/FreezeCard.svg";
import gPay from "@icons/GPay.svg";
import nextLogo from "@icons/Next.svg";
import plusIcon from "@icons/Plus.svg";
import replaceCard from "@icons/ReplaceCard.svg";
import spendLimit from "@icons/SpendLimit.svg";
import visaLogo from "@icons/VisaLogo.svg";

import styles from "@styles/Cards.module.scss";

const FIRST_DATA = {
  myCards: [
    { cardNumber: "1234567890121314", cardName: "Mark One", isFreezed: false, expiry: "12/20", cvv: 123 },
    { cardNumber: "1234567890121315", cardName: "Mark Two", isFreezed: false, expiry: "12/21", cvv: 123 },
    { cardNumber: "1234567890121316", cardName: "Mark Infinity", isFreezed: false, expiry: "12/22", cvv: 123 },
  ],
  companyCards: [
    { cardNumber: "1234567890121415", cardName: "Company One", isFreezed: false, expiry: "12/21", cvv: 123 },
    { cardNumber: "1234567890121416", cardName: "Haha Henry", isFreezed: false, expiry: "12/22", cvv: 123 },
    { cardNumber: "1234567890121417", cardName: "Company Three", isFreezed: false, expiry: "12/23", cvv: 123 },
  ],
};

export type CardType = {
  cardNumber: string;
  cardName: string;
  isFreezed: boolean;
  expiry: string;
  cvv: number;
};

const Home: NextPage = () => {
  const [activeTab, setActiveTab] = useState("My debit cards");
  const [showTransactions, setShowTransactions] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [showCancelCard, setShowCancelCard] = useState(false);
  const isMobile = useBreakpoint({ max: "sm" });
  const [cardsData, setCardsData] = useState<{ myCards?: CardType[]; companyCards?: CardType[] }>({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [isShowCard, setIsShowCard] = useState(false);

  useEffect(() => {
    setIsShowCard(false);
  }, [activeTab, activeIndex]);

  // typeof localStorage !== "undefined" ? localStorage.getItem("SIGNED_OUT_LINEUP") : null;

  const activeCard = (() => {
    const list = activeTab === "My debit cards" ? cardsData.myCards : cardsData.companyCards;
    return list?.[activeIndex];
  })();

  useEffect(() => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("CARD_DATA")) {
      setCardsData(JSON.parse(localStorage.getItem("CARD_DATA")));
    } else if (typeof localStorage !== "undefined" && !localStorage.getItem("CARD_DATA")) {
      setCardsData(FIRST_DATA);
      localStorage.setItem("CARD_DATA", JSON.stringify(FIRST_DATA));
    }
  }, []);

  useEffect(() => {
    if (!showTransactions) {
      setShowAllTransactions(false);
    }
  }, [showTransactions]);

  const renderPageHeader = () => {
    return (
      <div className="flex justify-between align-end">
        <div>
          <Text className="mb10" color={isMobile ? "light" : "dark"} weight={isMobile ? "semi-bold" : "normal"}>
            Available Balance
          </Text>
          <div className="flex align-center gap15">
            <Text className={styles.balanceSymbol} size="sm" color="light" weight="bold">
              S$
            </Text>
            <Title variant="h1" className="fs26" color={isMobile ? "light" : "dark"}>
              3,000
            </Title>
          </div>
        </div>
        <Button leftIcon={plusIcon} onClick={() => setShowAddCardModal(true)}>
          New Card
        </Button>
      </div>
    );
  };

  const renderNav = () => {
    const links = ["My debit cards", "All company cards"];
    return (
      <NavList justify={"start"} className={clsx(!isMobile && "flex align-center gap50")}>
        {links.map((item) => (
          <NavItem
            key={item}
            replace
            shallow
            exact
            variant="body"
            active={activeTab === item}
            position="left"
            className={clsx("pv15")}
            onClick={() => setActiveTab(item)}
          >
            <Text
              className="flex align-center gap5"
              color={isMobile ? (activeTab === item ? "light" : "grey1") : activeTab === item ? "dark" : "grey2"}
              weight="semi-bold"
            >
              {item}
            </Text>
          </NavItem>
        ))}
      </NavList>
    );
  };

  const cardPlaceholderFourDots = () => {
    return (
      <div className={styles.cardPlaceholder}>
        <div className={styles.placeHolderDot} />
        <div className={styles.placeHolderDot} />
        <div className={styles.placeHolderDot} />
        <div className={styles.placeHolderDot} />
      </div>
    );
  };

  const handleCancelCard = () => {
    const cards = cloneDeep(cardsData);
    const list = activeTab === "My debit cards" ? cards.myCards : cards.companyCards;
    if (activeIndex > -1 && list?.length) {
      list.splice(activeIndex, 1);
    }
    const obj = {
      myCards: activeTab === "My debit cards" ? list : cards.myCards,
      companyCards: activeTab === "My debit cards" ? cards.companyCards : list,
    };
    localStorage.setItem("CARD_DATA", JSON.stringify(obj));
    setCardsData(obj);

    setShowCancelCard(false);
  };

  const handleToggleFreezeCard = () => {
    const cards = cloneDeep(cardsData);
    const list = activeTab === "My debit cards" ? cards.myCards : cards.companyCards;
    if (activeIndex > -1 && list?.length) {
      list[activeIndex].isFreezed = !list[activeIndex].isFreezed;
    }
    const obj = {
      myCards: activeTab === "My debit cards" ? list : cards.myCards,
      companyCards: activeTab === "My debit cards" ? cards.companyCards : list,
    };
    localStorage.setItem("CARD_DATA", JSON.stringify(obj));
    setCardsData(obj);
  };

  const renderCancelCardModal = () => {
    return (
      <Modal
        open={showCancelCard}
        showHeader={false}
        className={styles.modal}
        classes={{ body: isMobile ? "" : "ph20" }}
        onClose={() => setShowCancelCard(false)}
        isLightMode
      >
        <div className="mb20 flex align-center justify-between">
          <Title font="saphiro" color="dark" variant={isMobile ? "h4" : "h1"}>
            Cancel Card
          </Title>
        </div>
        <Text align={isMobile ? "center" : "left"} className="mb20" color="dark" size={isMobile ? "xl" : "lg"}>
          Are you sure you want to cancel your card.
        </Text>
        <Button fullWidth onClick={handleCancelCard} isLetterSpacing>
          Cancel Card
        </Button>
      </Modal>
    );
  };

  const renderCard = (card: CardType) => {
    return (
      <div>
        <div className="flex justify-end">
          <div className={styles.showCard} onClick={() => setIsShowCard(!isShowCard)}>
            <Image src={eyeLogo} height={16} width={16} />
            <Text weight="semi-bold" size="xs" color="success">
              {isShowCard ? "Hide Card Number" : "Show card number"}
            </Text>
          </div>
        </div>
        <div className={clsx(styles.card, card.isFreezed && styles.freezedCard)}>
          {card.isFreezed && (
            <div className={styles.freezedTag}>
              <Text color="light" weight="bold">
                Freezed
              </Text>
            </div>
          )}
          <div className={styles.cardLogo}>
            <Image src={cardLogo} height={24} width={84} />
          </div>
          <Title color="light" variant="h1" className="mb30">
            {card.cardName}
          </Title>
          <div className="flex align-center gap45 mb10">
            {isShowCard ? (
              <>
                <Text color="light" weight="bold">
                  {card.cardNumber.slice(0,4)}
                </Text>
                <Text color="light" weight="bold">
                  {card.cardNumber.slice(4,8)}
                </Text>
                <Text color="light" weight="bold">
                  {card.cardNumber.slice(8,12)}
                </Text>
              </>
            ) : (
              <>
                {cardPlaceholderFourDots()}
                {cardPlaceholderFourDots()}
                {cardPlaceholderFourDots()}
              </>
            )}
            <Text color="light" weight="bold">
              {card.cardNumber.slice(-4)}
            </Text>
          </div>
          <div className="flex align-center gap35">
            <Text color="light" weight="bold" size="sm">
              Thru: {card.expiry}
            </Text>
            <div className="flex align-center gap5">
              <Text color="light" weight="bold" size="sm">
                CVV:
              </Text>
              <Title color="light" variant="h1" className="mt10">
                ***
              </Title>
            </div>
          </div>
          <div className="flex justify-end">
            <Image src={visaLogo} height={23} width={67} />
          </div>
        </div>
      </div>
    );
  };

  const renderCardsCarousel = () => {
    const list = activeTab === "My debit cards" ? cardsData?.myCards : cardsData?.companyCards;
    return (
      <div>
        {list?.length && (
          <Carousel
            spaceBetween={20}
            slidesPerView={1}
            components={list?.map((card) => renderCard(card))}
            onSlideChange={(slider) => setActiveIndex(slider.activeIndex)}
          />
        )}
      </div>
    );
  };

  const renderAction = (logo, text, handleClick = () => {}) => {
    return (
      <div className="flex column align-center flex1 gap10 cursor-pointer" onClick={handleClick}>
        <Image src={logo} height={32} width={32} />
        <Text align="center" size="sm" color="primary-color">
          {text}
        </Text>
      </div>
    );
  };

  const renderCardActions = () => {
    return (
      <div className={styles.actions}>
        {renderAction(freezeCard, activeCard?.isFreezed ? "Activate Card" : "Freeze Card", handleToggleFreezeCard)}
        {renderAction(spendLimit, "Set spend limit")}
        {renderAction(gPay, "Add to GPay")}
        {renderAction(replaceCard, "Replace card")}
        {renderAction(cancelCard, "Cancel card", () => setShowCancelCard(true))}
      </div>
    );
  };

  const renderCardDetailRow = (label, text) => {
    return (
      <div className="flex justify-between align-center">
        <Text weight="semi-bold">{label}</Text>
        <Text color="primary-color" size="sm">
          {text}
        </Text>
      </div>
    );
  };

  const renderCardDetails = () => {
    return (
      <div className="mb30">
        <Accordion text={"Card Details"} isToggled={true} icon={cardDetails}>
          <div className="flex column gap20">
            {renderCardDetailRow("Bank Name", "Aspire")}
            {renderCardDetailRow("Card Type", "VISA")}
            {renderCardDetailRow("Issue Date", "02 Jan 2020")}
            {renderCardDetailRow("Expiry Date", "02 Jan 2025")}
            {renderCardDetailRow("Card Holder", "Arun")}
          </div>
        </Accordion>
      </div>
    );
  };

  const renderTransaction = (isLast?: boolean) => {
    return (
      <div className={clsx(!isLast && styles.transaction)}>
        <div className="flex justify-between align-start">
          <div className="flex">
            <div className={styles.transactionLogo}>
              <Image src={fileStorage} height={16} width={16} />
            </div>
            <div className="mt5">
              <Text weight="semi-bold" className="mb5">
                Hamleys
              </Text>
              <Text size="sm" color="grey">
                20 May 2020
              </Text>
            </div>
          </div>
          <div className="mt5 flex align-center gap15">
            <Text weight="bold" color="success">
              + S$ 150
            </Text>
            <Image src={nextLogo} height={12} width={6.5} />
          </div>
        </div>
        <div className="flex align-center justify-center gap10 mt10 cursor-pointer">
          <div className={styles.transactionAction}>
            <Image src={cardWhite} height={7.86} width={10} />
          </div>
          <Text size="xs" weight="semi-bold" color="primary1">
            Refund on debit card
          </Text>
        </div>
      </div>
    );
  };

  const renderCardTransactions = () => {
    return (
      <div>
        <Accordion
          text={"Recent Transactions"}
          isToggled={showTransactions}
          icon={cardTransactions}
          handleToggle={() => setShowTransactions(!showTransactions)}
        >
          <div className="pv20">
            {[1, 2, 3, 4, 5, 6, 7]
              .slice(0, showAllTransactions ? 7 : 4)
              .map((num) => renderTransaction(num === (showAllTransactions ? 7 : 4)))}
          </div>
        </Accordion>
        {showTransactions && !showAllTransactions && (
          <div
            className={styles.allTransaction}
            onClick={() => {
              setShowAllTransactions(true);
            }}
          >
            <Text color="success" weight="semi-bold" size="sm" align="center">
              View all card transactions
            </Text>
          </div>
        )}
      </div>
    );
  };

  const renderDesktopCardView = () => {
    return (
      <div className={styles.desktopCardView}>
        <Row>
          <Col lg={6} sm={12}>
            {renderCardsCarousel()}
            {renderCardActions()}
          </Col>
          <Col lg={6} sm={12}>
            {renderCardDetails()}
            {renderCardTransactions()}
          </Col>
        </Row>
      </div>
    );
  };

  const renderDesktop = () => {
    return (
      <div className={styles.desktop}>
        {renderPageHeader()}
        {renderNav()}
        {renderDesktopCardView()}
      </div>
    );
  };

  const renderMobile = () => {
    return (
      <div className={styles.mobile}>
        <div className={styles.sticky}>
          <Container>
            {renderPageHeader()}
            {renderNav()}
            {renderCardsCarousel()}
          </Container>
        </div>
        <div className={styles.bottom}>
          {renderCardActions()}
          <Container>
            {renderCardDetails()}
            {renderCardTransactions()}
          </Container>
        </div>
      </div>
    );
  };
  return (
    <>
      <Layout>{isMobile ? renderMobile() : <Container> {renderDesktop()}</Container>}</Layout>
      {renderCancelCardModal()}
      <AddCardModal
        open={showAddCardModal}
        onClose={() => setShowAddCardModal(false)}
        cardsData={cardsData}
        setCardsData={setCardsData}
        activeIndex={activeIndex}
        activeTab={activeTab}
      />
    </>
  );
};

export default Home;
