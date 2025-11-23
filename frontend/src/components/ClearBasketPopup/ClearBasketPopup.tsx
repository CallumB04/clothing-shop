import Popup from "@/components/Popup/Popup";
import PopupHeader from "../Popup/PopupHeader";
import SecondaryButton from "../Button/SecondaryButton";
import PrimaryButton from "../Button/PrimaryButton";
import { useBasket } from "@/context/BasketContext";
import PopupButtons from "../Popup/PopupButtons";

interface ClearBasketPopupProps {
    closePopup: () => void;
}

const ClearBasketPopup: React.FC<ClearBasketPopupProps> = ({ closePopup }) => {
    const { clearBasket } = useBasket();

    const handleClear = () => {
        clearBasket(true);
        closePopup();
    };

    return (
        <Popup closePopup={closePopup}>
            <PopupHeader
                title="Clear Basket"
                description="Are you sure you want to clear your basket?"
                closePopup={closePopup}
            />
            <PopupButtons>
                <SecondaryButton className="w-full" onClick={closePopup}>
                    Cancel
                </SecondaryButton>
                <PrimaryButton className="w-full" onClick={handleClear}>
                    Clear
                </PrimaryButton>
            </PopupButtons>
        </Popup>
    );
};

export default ClearBasketPopup;
