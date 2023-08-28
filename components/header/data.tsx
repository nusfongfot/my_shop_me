import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import InfoIcon from "@mui/icons-material/Info";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WineBarIcon from "@mui/icons-material/WineBar";
import CreditCardIcon from "@mui/icons-material/CreditCard";

export const data = [
  { title: "Track Order", link: "/track", icon: <FmdGoodIcon /> },
  // { title: "Compare", link: "/compare", icon: <PublishedWithChangesIcon /> },
  { title: "Customer Support", link: "/customer", icon: <HeadphonesIcon /> },
  { title: "Need Help", link: "/help", icon: <InfoIcon /> },
];

export const data1 = [
  {
    title: "Fasted Delivery",
    subtitle: "Delivery in 24/H",
    icon: <LocalShippingIcon sx={{ fontSize: 80 }} />,
  },
  {
    title: "24 Hours Return",
    subtitle: "100% money-back guarantee",
    icon: <WineBarIcon sx={{ fontSize: 80 }} />,
  },
  {
    title: "Secure Payment",
    subtitle: "Your money is safe",
    icon: <CreditCardIcon sx={{ fontSize: 80 }} />,
  },
  {
    title: "Support 24/7",
    subtitle: "Live contact/message",
    icon: <HeadphonesIcon sx={{ fontSize: 80 }} />,
  },
];
