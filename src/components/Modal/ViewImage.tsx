import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        mx="auto"
        my="auto"
        w="auto"
        h="auto"
        maxW="900px"
        maxH="600px"
        bg="transparent"
      >
        <ModalBody p="0">
          <Link as="a" href={imgUrl} isExternal>
            <Image src={imgUrl} maxW="900px" maxH="600px" />
          </Link>
        </ModalBody>
        <ModalFooter
          align="flex-start"
          h="12"
          bg="gray.800"
          borderBottomRadius="12"
        >
          <Link as="a" href={imgUrl} isExternal mr="auto">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
