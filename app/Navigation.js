"use client";
import Link from "next/link";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  AddIcon,
  ExternalLinkIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import colors from "../lib/constants";
import React from "react";
import { usePathname } from "next/navigation";
export default function Navigation() {
  const { isOpen, onToggle } = useDisclosure();

  // get current path if its home page then don't show navigation
  const path = usePathname();

  return (
    <>
      {path === "/" ? (
        <></>
      ) : (
        <Box>
          <Flex
            bg={colors.c3}
            minH={"50px"}
            py={{ base: 2 }}
            px={{ base: 4 }}
            align={"center"}
          >
            <Flex
              flex={{ base: 1, md: "auto" }}
              ml={{ base: -2 }}
              display={{ base: "flex", md: "none" }}
            >
              <IconButton
                fontSize={["xs", "sm", "md"]}
                onClick={onToggle}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                variant={"ghost"}
                aria-label={"Toggle Navigation"}
              />
            </Flex>
            <Flex flex={{ base: 3 }} justify={"flex-start"}>
              <Link href="/">
                <Text
                  align="left"
                  justify={"flex-start"}
                  alignSelf="center"
                  alignContent={"flex-start"}
                  alignItems={"flex-start"}
                  p="1"
                  fontSize={["sm", "md", "xl", "2xl", "4xl"]}
                  noOfLines={1}
                  fontWeight={900}
                  color="whiteAlpha.900"
                  transition={"all 1s ease"}
                  transitionProperty="all"
                  transitionDuration="1s"
                  transitionTimingFunction="ease"
                  _hover={{
                    textDecoration: "none",
                    color: colors.c2,
                  }}
                >
                  Muscat Shopping Center
                </Text>
              </Link>

              <Flex
                display={{ base: "none", md: "flex" }}
                align="center"
                m="auto"
                p="1"
              >
                <DesktopNav />
              </Flex>
            </Flex>
          </Flex>

          <Collapse in={isOpen} animateOpacity>
            <MobileNav />
          </Collapse>
        </Box>
      )}
    </>
  );
}

const DesktopNav = () => {
  return (
    <Stack direction={"row"} spacing={[1, 2, 3, 4]} px="2" m="auto" p="1">
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link p={2} href={navItem.href || "#"}>
                <Text
                  fontSize={["sm", "md", "lg", "xl"]}
                  fontWeight={900}
                  color="whiteAlpha.700"
                  _focus={{ boxShadow: "none" }}
                  _hover={{
                    textDecoration: "none",
                    color: colors.c2,
                  }}
                >
                  {navItem.label}
                </Text>
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                _focus={{ boxShadow: "none" }}
                color={colors.c2}
                fontSize={"lg"}
                fontWeight="extrabold"
                boxShadow={"xl"}
                bg="white"
                p={2}
                rounded={"xl"}
                w="12rem"
                minW={"6rem"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child}>
                      {child.icon}
                    </DesktopSubNav>
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, children }) => {
  return (
    <Link href={href}>
      <Stack direction={"row"} align={"center"}>
        {children}
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: colors.c3 }}
            fontWeight={500}
          >
            {label}
          </Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        ></Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack bg="transparent" p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex py={2} href={href ?? "#"} align={"center"}>
        <Text fontWeight={600} color={colors.c3}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack mt={2} pl={4} boxShadow="2xl" align={"start"}>
          {children &&
            children.map((child) => (
              <Link key={child.label} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
const iconColor = { color: colors.c3, w: "5", h: "5" };
const NAV_ITEMS = [
  {
    label: "Bills",
    children: [
      {
        label: "Add Bill",
        icon: <AddIcon {...iconColor} />,
        href: "/bill/add",
      },
      {
        label: "Show Bills",
        href: "/bill/show",
        icon: <ExternalLinkIcon {...iconColor} />,
      },
    ],
  },

  {
    label: "Expenses",
    children: [
      {
        label: "Add Expenses",
        icon: <ViewIcon {...iconColor} />,
        href: "/exp/add",
      },
      {
        label: "Show",
        href: "/exp/show",
        icon: <ExternalLinkIcon {...iconColor} />,
      },
    ],
  },
  {
    label: "Employees",
    children: [
      {
        label: "Add Employee",
        icon: <AddIcon {...iconColor} />,
        href: "/emp/add",
      },
      {
        label: "Show Employees",
        href: "/emp/show",
        icon: <ExternalLinkIcon {...iconColor} />,
      },
    ],
  },
];
