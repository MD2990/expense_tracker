
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
  useColorModeValue,
  useBreakpointValue,
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
import { SiHomeassistant } from "react-icons/si";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={colors.c3}
        minH={"80px"}
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
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            color={useColorModeValue("whiteAlpha.800", "white")}
         
          >
            <Link href="/">
              
                <SiHomeassistant size="2.5rem" />
              
            </Link>
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

  
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  return (
    <Stack direction={"row"} spacing={4} mt="3">
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link p={2} href={navItem.href || "#"}>
                <Text       fontSize={['sm','md','lg','xl']}
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
                border={0}
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

      <Link href={href} >
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
      <Flex
        py={2}
   
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
    
      >
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

      <Collapse
        in={isOpen}
        animateOpacity
        style={{ marginTop: "0!important" }}
     
      >
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
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
        href: "/AddBill",
      },
      {
        label: "Show Bills",
        href: "/ShowBill",
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
        href: "/AddExp",
      },
      {
        label: "Show",
        href: "/ShowExp",
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
        href: "/AddEmp",
      },
      {
        label: "Show Employees",
        href: "/ShowEmp",
        icon: <ExternalLinkIcon {...iconColor} />,
      },
    ],
  },
];
