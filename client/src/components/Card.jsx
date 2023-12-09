/* eslint-disable react/prop-types */
import {
  Box,
  Image,
  Text,
  Link,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'

function Card(props) {
  const { name, description, socialLinks, profileImage, walletAddress } = props

  const gradient = useColorModeValue(
    'linear(to-r, green.400, purple.500)',
    'linear(to-r, green.400, purple.500)'
  )
  const textColor = 'white'

  return (
    <Box
      minH='300px'
      p={5}
      shadow='md'
      borderWidth='1px'
      style={{ background: gradient }}
    >
      <VStack>
        <Image
          borderRadius='full'
          border='1px solid gray'
          boxSize='100px'
          src={profileImage}
          alt={name}
        />
        <Text fontWeight='bold' color={textColor}>
          {name}
        </Text>
        <Text color={textColor}>{description}</Text>
        {socialLinks.map((link) => (
          <Link key={link._id} href={link.link} isExternal color={textColor}>
            {link.link}
          </Link>
        ))}
        <Text textAlign='center' color={textColor}>
          Wallet: {walletAddress}
        </Text>
      </VStack>
    </Box>
  )
}

export default Card
