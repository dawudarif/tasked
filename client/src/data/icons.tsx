import { BiSolidCake, BiMoney } from 'react-icons/bi';
import { FaNotesMedical } from 'react-icons/fa';
import { IoAirplaneSharp } from 'react-icons/io5';
import {
  BsFillBookmarksFill,
  BsPinAngleFill,
  BsListUl,
  BsMusicNote,
} from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import { MdOutlinePets, MdOutlineWork } from 'react-icons/md';
import { BsPeopleFill } from 'react-icons/bs';

interface ICollectionIcon {
  id: number;
  icon: JSX.Element;
}

export const collectionIcons: Array<ICollectionIcon> = [
  {
    id: 1,
    icon: <BsListUl size='inherit' />,
  },
  { id: 2, icon: <BsFillBookmarksFill size='inherit' /> },
  {
    id: 3,
    icon: <BsPinAngleFill size='inherit' />,
  },
  {
    id: 4,
    icon: <BiSolidCake size='inherit' />,
  },
  {
    id: 5,
    icon: <BiMoney size='inherit' />,
  },
  {
    id: 6,
    icon: <AiFillHome size='inherit' />,
  },
  {
    id: 7,
    icon: <FaNotesMedical size='inherit' />,
  },
  {
    id: 8,
    icon: <MdOutlineWork size='inherit' />,
  },
  {
    id: 9,
    icon: <BsPeopleFill size='inherit' />,
  },
  {
    id: 10,
    icon: <BsMusicNote size='inherit' />,
  },
  {
    id: 11,
    icon: <MdOutlinePets size='inherit' />,
  },
  {
    id: 12,
    icon: <IoAirplaneSharp size='inherit' />,
  },
];
