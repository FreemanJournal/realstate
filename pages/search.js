import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { BsFilter } from 'react-icons/bs'
import Property from '../components/Property'
import SearchFilter from '../components/SearchFilter'
import noresult from "../assets/images/noresult.svg"
import { baseUrl, fetchApi } from '../utils/fetchApi'
export default function Search({properties}) {
    const [searchFilters, setSearchFilters] = useState(false)
    const router = useRouter()
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
                onClick={()=>setSearchFilters(prev=>!prev)}

            >
                <Text>Search Property by filters</Text>
                <Icon paddingLeft="2" w="7" as={BsFilter}/>
            </Flex>
            {
                searchFilters && <SearchFilter/>
            }
            <Text fontSize="2xl" p="4" fontWeight="bold">
                Properties {router.query.purpose}
            </Text>
            <Flex flexWrap="wrap">
                {properties.map((property)=><Property key={property.id} property={property}/>)}
            </Flex>
            {properties.length === 0 &&(
                <Flex justifyContent="center" alignItems="center" flexDirection="column" marginTop="5" marginBottom="5">
                    <Image alt='No Results' src={noresult}/>
                    <Text fontSize="2xl" marginTop="3">No Result Found</Text>
                </Flex>
            )}
        </Box>
    )
}

export async function getServerSideProps({query}){
    const purpose = query.purpose || "for-rent";
    const rentFrequency = query.purpose || "yearly";
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';
  
    const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);
    console.log(data);
    return {
      props:{
        properties:data?.hits,
      }
    }
  }