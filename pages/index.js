import { Box, Button, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import Property from '../components/Property'
import { baseUrl, fetchApi } from '../utils/fetchApi'
// import imageUrl from "../styles/images/model.png"
const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  linkName,
  buttonText,
  imageUrl,
}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt="Banner" layout="" />
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title1}
        <br />
        {title2}
      </Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">
        {desc1}
        <br />
        {desc2}
      </Text>
      <Button fontSize="xl">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
)
export default function Home({propertyForSale,propertyForRent}) {
  return (
    <Box>
      <Banner
        purpose={'RENT A HOME'}
        title1={'Rental Homes for'}
        title2={'Everyone'}
        desc1="Explore Apartments,Villas,Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bit.ly/3B6dDou"
      />
      <Flex flexWrap="wrap">
        {propertyForRent?.map((property)=>(
          <Property property={property} key={property.id}></Property>
        ))}
      </Flex>
      <Banner purpose={'BUT A HOME'}
        title1={'Find,Buy & Own Your'}
        title2={'Dream Home'}
        desc1="Explore Apartments,Villas,Homes"
        desc2="and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bit.ly/3B90JWS" />
      <Flex flexWrap="wrap">
      {propertyForSale?.map((property)=>(
          <Property property={property} key={property.id}></Property>
        ))}
      </Flex>
    </Box>
  )
}


export async function getStaticProps(){
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)
  return {
    props:{
      propertyForSale:propertyForSale?.hits,
      propertyForRent:propertyForRent?.hits,
    }
  }
}