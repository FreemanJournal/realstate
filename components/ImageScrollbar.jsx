import { Box, Flex, Icon } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useContext } from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'

const LeftArrow = () => {
  console.log('left')
  const { scrollPrev } = useContext(VisibilityContext)
  return (
    <Flex justifyContent="center" alignItems="center" marginRight="1">
      <Icon
        as={FaArrowAltCircleLeft}
        onClick={() => scrollPrev()}
        fontSize="2xl"
        cursor="pointer"
      />
    </Flex>
  )
}
const RightArrow = () => {
  console.log('right')
  const { scrollNext } = useContext(VisibilityContext)
  return (
    <Flex justifyContent="center" alignItems="center" marginLeft="1">
      <Icon
        as={FaArrowAltCircleRight}
        onClick={() => scrollNext()}
        fontSize="2xl"
        cursor="pointer"
      />
    </Flex>
  )
}
export default function ImageScrollbar({ data }) {
  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      style={{ overFlow: 'hidden' }}
    >
      {data.map((image,i) => (
        <Box
          width="910px"
          itemID={image.id}
          overflow="hidden"
          p="1"
          key={i}
        >
          <Image
            placeholder="blur"
            blurDataURL={image.url}
            src={image.url}
            width={1000}
            height={500}
            alt="Property"
            sizes="(max-width:500px) 100px,(max-width:1023px) 400px,1000px"
          />
        </Box>
      ))}
    </ScrollMenu>
  )
}
