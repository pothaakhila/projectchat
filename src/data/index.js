import { faker } from "@faker-js/faker";
import { Language } from "@mui/icons-material";
import {
  ChatCircleDots,
  Gear,
  GearSix,
 
  SignOut,
  User,
  Users,
} from "phosphor-react";
import { RiContactsLine } from "react-icons/ri"; // Import the contact icon

const Profile_Menu = [
  {
    title: "Profile",
    icon: <User />,
  },
  {
    title: "Settings",
    icon: <Gear />,
  },
  {
    title: "Sign Out",
    icon: <SignOut />,
  },
];

const Nav_Buttons = [
  {
    index: 4,
    icon: <User />, // Added profile icon at index 0
  },
 
  {
    index: 0,
    icon: <ChatCircleDots />,
  },
  {
    index: 1,
    icon: <Users />,
  },
  {
    index: 2,
    icon: <RiContactsLine />, // Updated with the new contact icon
  },
];


const Nav_Setting = [
  {
    index: 3,
    icon: <GearSix />,
  },
 
];

const CallList = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: true,
    incoming: true,
    missed: false,
  },
  {
    id: 1,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: true,
    incoming: false,
    missed: true,
  },
  {
    id: 2,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: false,
    incoming: true,
    missed: true,
  },
  {
    id: 3,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: false,
    incoming: false,
    missed: false,
  },
  {
    id: 4,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: true,
    incoming: true,
    missed: false,
  },
  {
    id: 5,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: false,
    incoming: false,
    missed: false,
  },
  {
    id: 6,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: true,
    incoming: true,
    missed: false,
  },
  {
    id: 7,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: false,
    incoming: false,
    missed: false,
  },
  {
    id: 8,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: true,
    incoming: true,
    missed: false,
  },
  {
    id: 9,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: false,
    incoming: false,
    missed: false,
  },
  {
    id: 10,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: true,
    incoming: true,
    missed: false,
  },
  {
    id: 11,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: false,
    incoming: false,
    missed: false,
  },
  {
    id: 12,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: true,
    incoming: true,
    missed: false,
  },
];

const ChatList = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "9:36",
    unread: 0,
    pinned: true,
    online: true,
  },
  {
    id: 1,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "12:02",
    unread: 2,
    pinned: true,
    online: false,
  },
  {
    id: 2,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "10:35",
    unread: 3,
    pinned: false,
    online: true,
  },
  {
    id: 3,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "04:00",
    unread: 0,
    pinned: false,
    online: true,
  },
  {
    id: 4,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 5,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 6,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 7,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
];

const Chat_History = [
  {
    type: "msg",
    message: "Hi 👋🏻, How are ya ? ",
    incoming: true,
    outgoing: false,
    time: '06:40'
      
  },
  {
    type: "divider",
    text: "Today",
      time: '04:40'
  },
  {
    type: "msg",
    message: "Hi 👋 Panda, not bad, u ?",
    incoming: false,
    outgoing: true,
    time: '09:20'
  },
  {
    type: "msg",
    message: "Can you send me an abstarct image?",
    incoming: false,
    outgoing: true,
    time: '08:36'
  },
  {
    type: "msg",
    message: "Ya sure, sending you a pic",
    incoming: true,
    outgoing: false,
    time: '11:10'
  },

  {
    type: "msg",
    subtype: "img",
    message: "Here You Go",
    img: faker.image.abstract(),
    incoming: true,
    outgoing: false,
      time: '3:00'
  },
  {
    type: "msg",
    message: "Can you please send this in file format?",
    incoming: false,
    outgoing: true,
      time: '02:37'
  },

  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
      time: '08:40'
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
      time: '10:40'
  },
  {
    type: "msg",
    subtype: "reply",
    reply: "This is a reply",
    message: "Yep, I can also do that",
    incoming: false,
    outgoing: true,
    time: '05:01'
  },
];

const Message_options = [
  {
    title: "Reply",
  },
  {
    title: "React to message",
  },
  {
    title: "Forward message",
  },
  {
    title: "Star message",
  },
  {
    title: "Report",
  },
  {
    title: "Delete Message",
  },
];

const Shared_docs = [
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
    time: '02:40'
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
    time: '07:00'
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
    time: '09:00'
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
    time: '05:15'
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
    time: '07:40'
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
    time: '09:20'
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
    time: '03:20'
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
    time: '04:40'
  },
];

const Shared_links = [
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
    time: '02:05'
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
    time: '08:46'

  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
    time: '04:40'
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
    time: '09:40'
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
    time: '07:30'
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
    time: '09:40'
  },
];

const contacts = [
  { letter: 'A', list: [{ name: 'Albert Rodarte' }, { name: 'Allison Etter' }] },
  { letter: 'C', list: [{ name: 'Craig Smiley' }] },
  { letter: 'D', list: [{ name: 'Daniel Clay' }, { name: 'Doris Brown' }] },
  { letter: 'I', list: [{ name: 'Iris Wells' }] },
  { letter: 'J', list: [{ name: 'Juan Flakes' }, { name: 'John Hall' }, { name: 'Joy Southern' }] },
  { letter: 'M', list: [{ name: 'Mary Farmer' }, { name: 'Mark Messer' }, { name: 'Michael Hinton' }] },
  { letter: 'O', list: [{ name: 'Ossie Wilson' }] },
  { letter: 'P', list: [{ name: 'Phillis Griffin' }, { name: 'Paul Haynes' }] },
  { letter: 'R', list: [{ name: 'Rocky Jackson' }] },
  { letter: 'S', list: [{ name: 'Sara Muller' }, { name: 'Simon Velez' }, { name: 'Steve Walker' }] },
  { letter: 'H', list: [{ name: 'Hanah Mile' }] },
];

const messages = [
  {
    user: 'Admin',
    time: '2024-08-29T13:45:00Z', // Valid ISO string or timestamp
    text: 'Hi there!',
  },
  // more messages
];
export {
  messages,
  Profile_Menu,
  Nav_Setting,
  Nav_Buttons,
  ChatList,
  Chat_History,
  Message_options,
  Shared_links,
  Shared_docs,
  CallList,
  contacts
};
