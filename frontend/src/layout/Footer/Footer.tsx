import SecondaryButton from "@/components/Button/SecondaryButton";
import { WhiteText } from "@/components/Text/WhiteText";
import TextInput from "@/components/TextInput/TextInput";
import { ToastType, useToaster } from "@/context/ToasterContext";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import FooterNavigationList from "./FooterNavigationList";
import { LightText } from "@/components/Text/LightText";

// scroll to top of page
const handleScrollToTop = () => {
    document.body.scrollTop = 0; // mobile
    document.documentElement.scrollTop = 0; // desktop
};

const Footer = () => {
    const [email, setEmail] = useState<string>("");
    const newsletterEmailInput = useRef<HTMLInputElement>(null);

    const { addToast } = useToaster();

    // scroll to top when page changes
    const location = useLocation();
    useEffect(handleScrollToTop, [location]);

    const handleJoinNewsletter = () => {
        if (!email || !email.includes("@")) {
            addToast(
                "Invalid email",
                `Please enter a valid email into the box to join our newsletter`,
                ToastType.Error,
                5000
            );
        } else {
            addToast(
                "Welcome to our Newsletter",
                `Added ${email.slice(0, 3)}...${email.slice(email.indexOf("@"))} to the newsletter`,
                ToastType.Success,
                5000
            );
        }
        // reset email input
        if (newsletterEmailInput.current) {
            newsletterEmailInput.current.value = "";
            setEmail("");
        }
    };

    return (
        <footer className="bg-charcoal relative z-20 flex w-full flex-col items-center gap-20 p-8 sm:p-12">
            {/* Newsletter */}
            <div className="flex flex-col items-center gap-6">
                <div className="flex flex-col items-center gap-2 text-center">
                    <WhiteText className="text-3xl uppercase sm:text-4xl">
                        Join our newsletter today
                    </WhiteText>
                    <WhiteText className="text-sm font-light">
                        Be one of the first to hear about our promotions, sales
                        and everything else!
                    </WhiteText>
                </div>
                <TextInput
                    placeholder="Enter your email here..."
                    className="placeholder-light-text focus:border-input-border! h-11 w-full text-white sm:w-80"
                    ref={newsletterEmailInput}
                    onChange={(e) => setEmail(e)}
                />
                <SecondaryButton
                    onClick={handleJoinNewsletter}
                    className="w-full sm:w-max"
                >
                    Join now
                </SecondaryButton>
            </div>
            {/* Navigation and bottom footer */}
            <div className="flex w-full flex-col gap-4">
                {/* Navigation Options */}
                <div className="border-b-light-text flex w-full flex-wrap justify-between gap-6 border-b-1 p-6 pt-0 sm:p-12">
                    <FooterNavigationList
                        header="Info"
                        options={[
                            {
                                label: "Return policy",
                                to: "/info?category=returns",
                            },
                            {
                                label: "Privacy policy",
                                to: "/info?category=privacy",
                            },
                            {
                                label: "Deliveries",
                                to: "/info?category=deliveries",
                            },
                            {
                                label: "Payments",
                                to: "/info?category=payments",
                            },
                        ]}
                    />
                    <FooterNavigationList
                        header="About Us"
                        options={[
                            {
                                label: "About Clothing Shop",
                                to: "/about?category=us",
                            },
                            {
                                label: "Our stores",
                                to: "/about?category=stores",
                            },
                            {
                                label: "Socials",
                                to: "/about?category=socials",
                            },
                        ]}
                    />
                    <FooterNavigationList
                        header="Need help?"
                        options={[
                            {
                                label: "Contact us",
                                to: "/contact",
                            },
                            {
                                label: "Cancel my subscription",
                                to: "/newsletter",
                            },
                            {
                                label: "Missing refund",
                                to: "/help?category=refunds",
                            },
                            {
                                label: "Track order",
                                to: "/help?category=orders",
                            },
                            {
                                label: "Report lost order",
                                to: "/help?category=orders",
                            },
                            {
                                label: "Find lost receipt",
                                to: "/help?category=receipts",
                            },
                        ]}
                    />
                    <FooterNavigationList
                        header="You might like these"
                        options={[
                            {
                                label: "New items",
                                to: "/shop?category=new",
                            },
                            {
                                label: "Current offers",
                                to: "/shop?category=offers",
                            },
                            {
                                label: "Men's tops",
                                to: "/shop/mens?category=tops",
                            },
                            {
                                label: "Women's tops",
                                to: "/shop/womens?category=tops",
                            },
                            {
                                label: "Men's bottoms",
                                to: "/shop/mens?category=bottoms",
                            },
                            {
                                label: "Women's bottoms",
                                to: "/shop/womens?category=bottoms",
                            },
                        ]}
                    />
                </div>
                {/* Copyright text */}
                <span className="flex w-full justify-end">
                    <LightText className="text-sm font-light uppercase">
                        © 2025 Clothing Shop
                    </LightText>
                </span>
            </div>
        </footer>
    );
};

export default Footer;
