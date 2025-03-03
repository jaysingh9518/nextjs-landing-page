'use client';

import Link from 'next/link';
import React, { useState, useEffect, ChangeEvent } from 'react';
import Image from 'next/image';
import { Transition } from '@headlessui/react';
import { HiOutlineXMark, HiBars3 } from 'react-icons/hi2';
import { FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';
import clsx from 'clsx';
import Container from './Container';
import { menuItems } from '@/data/menuItems';
import { headerLogo } from '@/data/headerLogo';
import EnquiryButton from './EnquiryButton';
import EnquiryPopup from "@/components/EnquiryPopup";

import { languagesData } from '@/data/lang';
import { useTranslation } from 'react-i18next';

const languageOptions = languagesData.languages;

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
    const [isHoveredWhatsApp, setIsHoveredWhatsApp] = useState(false);
    const [isHoveredEmail, setIsHoveredEmail] = useState(false);
    const [isHoveredCall, setIsHoveredCall] = useState(false);
    const { t, i18n } = useTranslation();

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedCode = event.target.value;
        const language = languageOptions.find(lang => lang.code === selectedCode);
        if (language) {
            setSelectedLanguage(language);
            i18n.changeLanguage(language.code);
        }
    };

    return (
        <>
        <header className={clsx("fixed top-0 left-0 right-0 z-50 mx-auto w-full transition-all duration-300", { "bg-white shadow-md backdrop-blur-md": isScrolled, "bg-[rgba(255,255,255,0.1)] backdrop-blur-md": !isScrolled})}>
            <Container className="!px-0">
                <nav className={clsx("mx-auto flex justify-between items-center py-2 px-5 md:py-5", { "md:py-2": isScrolled })}>
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src={headerLogo.src}
                            alt={headerLogo.alt}
                            width={headerLogo.width}
                            height={headerLogo.height}
                            className="min-w-fit"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden lg:flex items-center space-x-6">
                        {menuItems.map(item => (
                            <li key={item.text} className="hover:bg-secondary transition-colors rounded-md px-2">
                                <Link href={item.url} className="block text-foreground hover:text-white py-2">
                                    {t(item.text)}
                                </Link>
                            </li>
                        ))}

                        <li>
                            {/* Enquiry Button */}
                            <EnquiryButton onClick={() => setIsPopupVisible(true)} text={t('enquire_now')} />
                        </li>
                        {/* WhatsApp Button */}
                        <li>
                            <a
                                href="https://wa.me/919997365898"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-foreground hover:text-foreground-accent transition-colors flex items-center gap-2"
                            >
                                <div
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "5px",
                                    borderRadius: "8px",
                                    transition: "0.3s ease-in-out",
                                    background: isHoveredWhatsApp ? "rgba(0, 0, 0, 0.1)" : "transparent",
                                    boxShadow: isHoveredWhatsApp ? "4px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
                                }}
                                onMouseEnter={() => setIsHoveredWhatsApp(true)}
                                onMouseLeave={() => setIsHoveredWhatsApp(false)}
                                >
                                <FaWhatsapp
                                    size={30}
                                    style={{
                                    color: "#25D366",
                                    }}
                                />
                                </div>
                                {/* {t('whatsapp')} */}
                            </a>
                        </li>
                        {/* Email Button */}
                        <li>
                            <a
                                href="mailto:info@makemytravls.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-foreground hover:text-foreground-accent transition-colors flex items-center gap-2"
                            >
                                <div
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "5px",
                                    borderRadius: "8px",
                                    transition: "0.3s ease-in-out",
                                    background: isHoveredEmail ? "rgba(0, 0, 0, 0.1)" : "transparent",
                                    boxShadow: isHoveredEmail ? "4px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
                                }}
                                onMouseEnter={() => setIsHoveredEmail(true)}
                                onMouseLeave={() => setIsHoveredEmail(false)}
                                >
                                <FaEnvelope
                                    size={30}
                                    style={{
                                    color: "#EA4335",
                                    }}
                                />
                                </div>
                                {/* {t('email')} */}
                            </a>
                        </li>
                        {/* Call Now */}
                        <li>
                            <a
                                href="tel:+919997365898"
                                className="text-foreground hover:text-foreground-accent transition-colors flex items-center gap-2"
                            >
                                <div
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "5px",
                                    borderRadius: "8px",
                                    transition: "0.3s ease-in-out",
                                    background: isHoveredCall ? "rgba(0, 0, 0, 0.1)" : "transparent",
                                    boxShadow: isHoveredCall ? "4px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
                                }}
                                onMouseEnter={() => setIsHoveredCall(true)}
                                onMouseLeave={() => setIsHoveredCall(false)}
                                >
                                <FaPhone
                                    size={30}
                                    style={{
                                    color: "#304fff",
                                    transform: "scaleX(-1)",
                                    }}
                                />
                                </div>
                                {/* {t('call_now')} */}
                            </a>
                        </li>
                        {/* Language Selector */}
                        <li className="hidden relative items-center gap-2">
                            <Image src={selectedLanguage.flag} alt={selectedLanguage.label} width={24} height={16} className="rounded-sm" />
                            <select className="border-2 border-primary px-3 py-2 rounded-full focus:outline-none focus:ring-primary focus:ring-2 transition-colors" onChange={handleLanguageChange} value={selectedLanguage.code}>
                                {languageOptions.map(lang => (
                                    <option key={lang.code} value={lang.code}>
                                        {lang.label}
                                    </option>
                                ))}
                            </select>
                        </li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="bg-secondary text-white focus:outline-none rounded-full w-10 h-10 flex items-center justify-center"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? (
                                <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <HiBars3 className="h-6 w-6" aria-hidden="true" />
                            )}
                            <span className="sr-only">Toggle navigation</span>
                        </button>
                    </div>
                </nav>
            </Container>

            {/* Mobile Menu with Transition */}
            <Transition
                show={isOpen}
                enter="transition ease-out duration-200 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div id="mobile-menu" className="lg:hidden bg-white shadow-lg">
                    <ul className="flex flex-col space-y-4 pt-1 pb-6 px-6">
                        {menuItems.map(item => (
                            <li key={item.text}>
                                <Link href={item.url} className="text-foreground hover:text-secondary block" onClick={toggleMenu}>
                                    {t(item.text)}
                                </Link>
                            </li>
                        ))}
                        <li>
                            {/* Enquiry Button */}
                            <EnquiryButton 
                            onClick={() => {
                                setIsPopupVisible(true);
                                toggleMenu();
                            }} 
                            text={t('enquire_now')} 
                            />
                        </li>
                    </ul>
                    <ul className="flex items-center pb-6 px-6 gap-4">
                         {/* WhatsApp Button */}
                         <li>
                            <a
                                href="https://wa.me/919997365898"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-foreground hover:text-foreground-accent transition-colors flex items-center gap-2"
                            >
                                <div
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "5px",
                                    borderRadius: "8px",
                                    transition: "0.3s ease-in-out",
                                    background: isHoveredWhatsApp ? "rgba(0, 0, 0, 0.1)" : "transparent",
                                    boxShadow: isHoveredWhatsApp ? "4px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
                                }}
                                onMouseEnter={() => setIsHoveredWhatsApp(true)}
                                onMouseLeave={() => setIsHoveredWhatsApp(false)}
                                >
                                <FaWhatsapp
                                    size={30}
                                    style={{
                                    color: "#25D366",
                                    }}
                                />
                                </div>
                                {/* {t('whatsapp')} */}
                            </a>
                        </li>
                        {/* Email Button */}
                        <li>
                            <a
                                href="mailto:info@makemytravls.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-foreground hover:text-foreground-accent transition-colors flex items-center gap-2"
                            >
                                <div
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "5px",
                                    borderRadius: "8px",
                                    transition: "0.3s ease-in-out",
                                    background: isHoveredEmail ? "rgba(0, 0, 0, 0.1)" : "transparent",
                                    boxShadow: isHoveredEmail ? "4px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
                                }}
                                onMouseEnter={() => setIsHoveredEmail(true)}
                                onMouseLeave={() => setIsHoveredEmail(false)}
                                >
                                <FaEnvelope
                                    size={30}
                                    style={{
                                    color: "#EA4335",
                                    }}
                                />
                                </div>
                                {/* {t('email')} */}
                            </a>
                        </li>
                        {/* Call Now */}
                        <li>
                            <a
                                href="tel:+919997365898"
                                className="text-foreground hover:text-foreground-accent transition-colors flex items-center gap-2"
                            >
                                <div
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "5px",
                                    borderRadius: "8px",
                                    transition: "0.3s ease-in-out",
                                    background: isHoveredCall ? "rgba(0, 0, 0, 0.1)" : "transparent",
                                    boxShadow: isHoveredCall ? "4px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
                                }}
                                onMouseEnter={() => setIsHoveredCall(true)}
                                onMouseLeave={() => setIsHoveredCall(false)}
                                >
                                <FaPhone
                                    size={30}
                                    style={{
                                    color: "#304fff",
                                    transform: "scaleX(-1)",
                                    }}
                                />
                                </div>
                                {/* {t('call_now')} */}
                            </a>
                        </li>
                        {/* Language Selector */}
                        <li className="hidden relative items-center gap-2">
                            <Image src={selectedLanguage.flag} alt={selectedLanguage.label} width={24} height={16} className="rounded-sm" />
                            <select className="border-2 border-primary px-3 py-2 rounded-full focus:outline-none focus:ring-primary focus:ring-2 transition-colors" onChange={handleLanguageChange} value={selectedLanguage.code}>
                                {languageOptions.map(lang => (
                                    <option key={lang.code} value={lang.code}>
                                        {lang.label}
                                    </option>
                                ))}
                            </select>
                        </li>
                    </ul>
                </div>
            </Transition>
        </header>

        {/* Enquiry Form */}
        <EnquiryPopup isVisible={isPopupVisible} onClose={handleClosePopup} />

        </>
    );
};

export default Header;