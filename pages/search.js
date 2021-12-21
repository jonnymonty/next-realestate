import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';

import SearchFilters from '../components/SearchFilters';
import Property from '../components/Property';
import noresult from '../assets/images/noresult.svg';
import { baseUrl, fetchApi } from '../utils/fetchApi';

const Search = ({ properties }) => {
    const [searchFilters, setSearchFilters] = useState(false);
    const router = useRouter();

    return (
        <Box>
            <Flex
                cursor="pointer"
                bg="gray.100"
                borderBottom="1px"
                borderColor="gray.200"
                p="2"
                fontWeight="black"
                fontSize="lg"
                justifyContent="center"
                alignItems="center"
                onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
            >
                <Text>Search Property By Filters</Text>
                <Icon paddingLeft="2" w="7" as={BsFilter} />
            </Flex>
            {searchFilters && <SearchFilters />}
            <Text fontSize="2xl" p="4" fontWeight="bold">
                Properties {router.query.purpose}
            </Text>
            <Flex flexWrap="wrap">
                {properties.map((property) => <Property property={property} key={property.id} />)}
            </Flex>
            {properties.length === 0 && (
                <Flex justifyContent="center" alignItems="center" flexDirection="column" marginTop="5" marginBottom="5">
                    <Image alt="no result" src={noresult} />
                    <Text fontSize="2xl" marginTop="3">No Results Found</Text>
                </Flex>
            )}
        </Box>
    )
}

export default Search;

export async function getServerSideProps({ query }) {
    const purpose = query.purpose || 'list-for-rent';
    const priceMin = query.priceMin || '0';
    const priceMax = query.priceMax || '10000000';
    const sqftMin = query.sqftMin || '0';
    const bedsMin = query.bedsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'relevance';
    const state_code = query.state_code || 'WI';
    const city = query.city || 'Milwaukee';

    const data = await fetchApi(`${baseUrl}/properties/${purpose}?state_code=${state_code}&city=${city}&sort=${sort}&baths_min=${bathsMin}&beds_min=${bedsMin}&sqft_min=${sqftMin}&price_min=${priceMin}&price_max=${priceMax}`);
  
    return {
      props: {
        properties: data.listings
      }
    }
  }