import { useEffect, useState } from 'react'
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
import { ToastContainer, toast } from 'react-toastify'

const MyFormModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [socialLinks, setSocialLinks] = useState([])
  const [profileImage, setProfileImage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [size, setSize] = useState('')
  const [email, setEmail] = useState('')
  const { address } = useAccount()

  const [showDashboard, setShowDashboard] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('dashboard')) {
      setShowDashboard(true)
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const socials = socialLinks.map((link) => ({
      platform: link.platform,
      link: link.link,
    }))

    const formData = {
      name,
      description,
      wallet_address: "abcde",
      social_links: socials,
      profile_image: profileImage,
      size,
      email,
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

      if (response.status === 500 || response.status === 400)
        setErrorMessage(response)

      if (response.status === 200) {
        console.log('Successfully submitted the form')
        toast.success('Successfully submitted the form!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        localStorage.setItem('dashboard', true)
        onClose()
      } else {
        console.error('Failed to submit the form')
        toast.error('Failed to submit the form', {
          position: 'top-right',
          autoClose: 20000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      }
    } catch (error) {
      console.error(
        'An error occurred while submitting the form:',
        errorMessage
      )
      toast.error('Wallet address already exists in the database', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
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
      <ToastContainer />
      <WrapItem>
        {showDashboard ? (
          <Button onClick={() => window.open('/dashboard', '_blank')}>
            Open Dashboard
          </Button>
        ) : (
          <Button colorScheme='teal' onClick={onOpen}>
            Join us now
          </Button>
        )}
      </WrapItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Your Organization Profile</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl mb='4'>
                <FormLabel>Name</FormLabel>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>
              <FormControl mb='4'>
                <FormLabel>No. of Employees </FormLabel>
                <Input value={size} onChange={(e) => setSize(e.target.value)} />
              </FormControl>
              <FormControl mb='4'>
                <FormLabel>Official Email ID</FormLabel>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
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
                  value={walletAddress || address}
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
