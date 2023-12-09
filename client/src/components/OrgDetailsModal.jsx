import { useState } from 'react'
import { useAccount } from 'wagmi'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useDisclosure,
  WrapItem,
} from '@chakra-ui/react'
import axios from 'axios'

const MyFormModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [socialLinks, setSocialLinks] = useState([])
  const [profileImage, setProfileImage] = useState('')
  const { address } = useAccount()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const socials = socialLinks.map((link) => ({
      platform: link.platform,
      link: link.link,
    }))

    const formData = {
      name,
      description,
      wallet_address: addressUpdate,
      social_links: socials,
      profile_image: profileImage,
    }

    console.log('formData', formData)

    try {
      const headers = {
        'Content-Type': 'application/json',
      }

      const response = await axios.post(
        'http://localhost:3001/api/orgs',
        formData,
        { headers }
      )

      if (response.status === 200) {
        console.log('Successfully submitted the form')
        onClose()
      } else {
        console.error('Failed to submit the form')
      }
    } catch (error) {
      console.error('An error occurred while submitting the form:', error)
    }
  }

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: '', link: '' }])
  }

  const removeSocialLink = (index) => {
    const updatedLinks = [...socialLinks]
    updatedLinks.splice(index, 1)
    setSocialLinks(updatedLinks)
  }

  const handleSocialLinkChange = (index, field, value) => {
    const updatedLinks = [...socialLinks]
    updatedLinks[index][field] = value
    setSocialLinks(updatedLinks)
  }

  return (
    <>
      <WrapItem>
        <Button colorScheme='teal' onClick={onOpen}>
          Join us now
        </Button>
      </WrapItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Your Profile</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl mb='4'>
                <FormLabel>Name</FormLabel>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>
              <FormControl mb='4'>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <FormControl mb='4'>
                <FormLabel>Wallet Address</FormLabel>
                <Input
                  value={
                    walletAddress ||
                    `${address.slice(0, 7)}...${address.slice(33, 40)}`
                  }
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
              </FormControl>
              {socialLinks.map((link, index) => (
                <div key={index}>
                  <FormControl mb='4'>
                    <FormLabel>Social Platform</FormLabel>
                    <Input
                      value={link.platform}
                      placeholder='Twitter or Github'
                      onChange={(e) =>
                        handleSocialLinkChange(
                          index,
                          'platform',
                          e.target.value
                        )
                      }
                    />
                  </FormControl>
                  <FormControl mb='4'>
                    <FormLabel>Social Link</FormLabel>
                    <Input
                      value={link.link}
                      onChange={(e) =>
                        handleSocialLinkChange(index, 'link', e.target.value)
                      }
                    />
                  </FormControl>
                  <Button
                    variant='ghost'
                    colorScheme='red'
                    border='1px solid red'
                    mb='8'
                    onClick={() => removeSocialLink(index)}
                  >
                    Remove Social Link
                  </Button>
                </div>
              ))}
              <Button colorScheme='blue' mb='4' onClick={addSocialLink}>
                Add Social Link
              </Button>
              <FormControl mb='4'>
                <FormLabel>Profile Image URL</FormLabel>
                <Input
                  value={profileImage}
                  onChange={(e) => setProfileImage(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} type='submit'>
                Save
              </Button>
              <Button variant='ghost' onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MyFormModal
