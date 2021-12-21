import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, Text, Avatar } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';

import DefaultImage from '../assets/images/house.webp';

// coverPhoto, price, rentFrequency, rooms, title, baths, area, agency, isVerified, externalId

const Property = ({ property: { photo, price, beds, baths, sqft, address, isVerified, listing_id } }) => (
    <Link href={`/property/${listing_id}`} passHref>
        <Flex flexWrap="wrap" w="420px" p="5" paddingTop="0" justifyContent="flex-start" cursor="pointer">
            <Box>
                <Image src={photo ? photo : DefaultImage} width={400} height={260} alt="house" />
            </Box>
            <Box w="full">
                <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
                    <Flex alignItems="center">
                        <Box paddingRight="3" color="green.400">{isVerified && <GoVerified />}</Box>
                        <Text fontWeight="bold" fontSize="lg">Price: {price}</Text>
                    </Flex>
                    {/* <Box>
                        <Avatar size="sm" src={agency?.logo?.url} />
                    </Box> */}
                </Flex>
                <Flex alignItems="center" p="1" justifyContent="space-between" w="250px" color="blue.400">
                    {beds} <FaBed /> | {baths} <FaBath /> | {sqft} <BsGridFill />
                </Flex>
                <Text fontSize="lg">
                    {address.length > 30 ? `${address.substring(0, 30)}...` : address}
                </Text>
            </Box>
        </Flex>
    </Link>
);

export default Property;