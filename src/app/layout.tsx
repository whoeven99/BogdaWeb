"use client";

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import "@ant-design/v5-patch-for-react-19";
import { Button, ConfigProvider, Drawer, Flex, Layout, Space } from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import "./globals.css";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ciwiFooterFeaturesItems = [
  {
    title: "About us",
    href: "/",
  },
  {
    title: "Connect us",
    href: "/",
  },
  {
    title: "Privacy police",
    href: "/",
  },
  {
    title: "Terms &conditions",
    href: "/",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#6841ea",
            },
            components: {
              Layout: {
                headerBg: "#FFF",
              },
            },
          }}
        >
          <Layout>
            <Header className={styles.ciwiHeader}>
              <Flex justify="space-between" align="center">
                <Space size={48}>
                  <span className={styles.ciwiHeaderLogo}>Ciwi.ai</span>
                  {!isMobile && (
                    <Flex align="center" justify="start">
                      <Button
                        type="text"
                        iconPosition={"end"}
                        onClick={() => {
                          window.open(
                            "https://apps.shopify.com/translator-by-ciwi",
                            "_blank"
                          );
                        }}
                      >
                        Product
                      </Button>
                      <Button type="text" iconPosition={"end"}>
                        Pricing
                      </Button>
                      <Link href="/help-center">
                      <Button type="text" iconPosition={"end"}>
                        Help center
                      </Button>
                      </Link>
                      <Button type="text" iconPosition={"end"}>
                        Blog
                      </Button>
                    </Flex>
                  )}
                </Space>
                <Space>
                  <Button
                    type="primary"
                    onClick={() => {
                      window.open(
                        "https://apps.shopify.com/translator-by-ciwi",
                        "_blank"
                      );
                    }}
                  >
                    Add to Shopify
                  </Button>
                  {isMobile && (
                    <Button
                      type="text"
                      icon={<MenuOutlined />}
                      className={styles.menuBtn}
                      onClick={() => setIsOpen(!isOpen)}
                    />
                  )}
                </Space>
                <Drawer
                  placement="left"
                  onClose={() => setIsOpen(false)}
                  open={isOpen}
                  width={300}
                  closeIcon={<CloseOutlined />}
                >
                  <div className={styles.drawerMenu}>
                    <div className={styles.menuItem}>Product</div>
                    <div className={styles.menuItem}>Pricing</div>
                    <div className={styles.menuItem}>Help center</div>
                    <div className={styles.menuItem}>Blog</div>
                  </div>
                </Drawer>
              </Flex>
            </Header>
            {children}
            <Footer className={styles.ciwiFooter}>
              <div className={styles.ciwiFooterContainer}>
                <div className={styles.ciwiFooterLeft}>
                  <a href="#">
                    <div className={styles.ciwiFooterLeftLogo}>
                      <Image
                        src="/ciwi-translator-icon.png"
                        alt="Ciwi"
                        width={isMobile ? 20 : 24}
                        height={isMobile ? 20 : 24}
                      />
                      <div className={styles.ciwiFooterLeftText}>
                        <span>Ciwi</span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className={styles.ciwiFooterRight}>
                  <div className={styles.ciwiFooterRightItem}>
                    {ciwiFooterFeaturesItems.map((item) => (
                      <a
                        key={item.title}
                        href={item.href}
                        className={styles.ciwiFooterLink}
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Footer>
          </Layout>
        </ConfigProvider>
      </body>
    </html>
  );
}
