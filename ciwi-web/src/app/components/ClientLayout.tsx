"use client";

import { ConfigProvider, Drawer, Flex, Layout, Menu, Space, Dropdown, Button,FloatButton } from "antd";
import { Header } from "antd/es/layout/layout";
import { CloseOutlined, MenuOutlined, DownOutlined } from "@ant-design/icons";
import styles from "../css/styles.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FooterLayout } from "./FooterLayout";  
import Image from 'next/image'
const menuItems = [
  {
    key: "product",
    label: "Product",
    children: [
      {
        key: "ciwi-ai-translator",
        label: (
          <Link href="/product/ciwi-ai-translator" className={styles.dropdownItem}>Ciwi-AI Translator</Link>
        ),
      },
      {
        key: "ciwi-ai-product-content",
        label: (
          <Link href="/product/ciwi-ai-product-content" className={styles.dropdownItem}>
            Ciwi-AI Product Content
          </Link>
        ),
      },
    ],
  },
  {
    key: "shopify-plan",
    label: "Shopify Plan",
    children: [
      {
        key: "shopify-1-dollar",
        label: <Link href="/shopify-plan/1-dollar" className={styles.dropdownItem}>$1 开通 Shopify</Link>,
      },
      {
        key: "why-shopify",
        label: (
          <Link href="/shopify-plan/why-shopify"className={styles.dropdownItem}>为什么使用 Shopify</Link>
        ),
      },
      {
        key: "build-shopify",
        label: <Link href="/shopify-plan/build"className={styles.dropdownItem}>Shopify 建站</Link>,
      },
      {
        key: "migrate-shopify",
        label: (
          <Link href="/shopify-plan/migrate"className={styles.dropdownItem}>如何迁移到 Shopify</Link>
        ),
      },
    ],
  },
  {
    key: "pricing",
    label: <Link href="/pricing"className={styles.dropdownItem}>Pricing</Link>,
  },
  {
    key: "resource",
    label: "Resource",
    children: [
      {
        key: "help-center",
        label: <Link href="http://ciwi.ai/help-center/ShopifyApp/about-ciwi-ai-translator-shopify-app"className={styles.dropdownItem}>Help Center</Link>,
      },
      {
        key: "blog",
        label: <Link href="https://blog.ciwi.ai/"className={styles.dropdownItem}>Blog</Link>,
      },
    ],
  },
];
const dropdownMenus = {
  product: {
    items: menuItems.find((item) => item.key === "product")?.children || [],
  },
  shopifyPlan: {
    items: menuItems.find((item) => item.key === "shopify-plan")?.children || [],
  },
  resource: {
    items: menuItems.find((item) => item.key === "resource")?.children || [],
  },
};


export default function ClientLayout({
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
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#6841ea",
        },
        components: {
          Layout: {
            headerBg: "#FFF",
          },
          Menu: {
            itemBg: "#FFF",
            subMenuItemBg: "#FFF",
            itemHoverBg: "#F5F5F5",
            itemSelectedBg: "#E6F7FF",
            popupBg: "#FFF",
            itemMarginInline: 16,
          },
          Dropdown: {
            controlItemBgHover: "#F5F5F5",
            controlItemBgActive: "#E6F7FF",
          },
        },
      }}
    >
      <Layout>
        <Header className={styles.ciwiHeader}>
          <Flex justify="space-between" align="center">
            <Space size={48}>
            <Link href="https://ciwi.ai">
                <Image 
                  src="/logo-150.png" 
                  alt="ciwi.ai" 
                  width={48}  
                  height={48}
                />
            </Link>
              {!isMobile && (
                <Flex align="center" gap={16}>  
                  <Dropdown
                    menu={dropdownMenus.product}
                    placement="bottom"
                    trigger={["hover"]}
                  >
                    <Button type="text" className={styles.centerDropdown} icon={<DownOutlined />} iconPosition="end">
                      Product
                    </Button>
                  </Dropdown>
                  <Dropdown
                    menu={dropdownMenus.shopifyPlan}
                    placement="bottom"
                    trigger={["hover"]}
                  >
                    <Button type="text" className={styles.centerDropdown} icon={<DownOutlined />} iconPosition="end">
                      Shopify Plan
                    </Button>
                  </Dropdown>
                  <Button type="text">
                    <Link href="/pricing" className={styles.centerDropdown}>Pricing</Link>
                  </Button>
                <Dropdown
                    menu={dropdownMenus.resource}
                    placement="bottom"
                    trigger={["hover"]}
                    >
                    <Button type="text" className={styles.centerDropdown} icon={<DownOutlined />} iconPosition="end">
                        Resource
                    </Button> 
                </Dropdown>

                </Flex>
              )}
            </Space>
            <Space>
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
              <Menu
                mode="inline"
                items={menuItems}
                style={{ borderRight: "none" }}
              />
            </Drawer>
          </Flex>
        </Header>
        {children}
        <FooterLayout/>
        <FloatButton.BackTop />
      </Layout>
    </ConfigProvider>
  );
}
