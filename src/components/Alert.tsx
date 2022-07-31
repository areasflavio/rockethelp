import {
  Alert,
  Box,
  CloseIcon,
  HStack,
  IAlertProps,
  IconButton,
  Modal,
  Text,
  VStack,
} from 'native-base';

type Props = IAlertProps & {
  show: boolean;
  setShow: (state: boolean) => void;
  title: string;
  message: string;
};

export function AlertComponent({
  setShow,
  show,
  title,
  message,
  status,
}: Props) {
  return (
    <Box w="100%" alignItems="center">
      <Modal isOpen={show} onClose={() => setShow(false)}>
        <Alert w="90%" maxW="400" status={status}>
          <VStack space={1} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  _dark={{
                    color: 'coolGray.800',
                  }}
                >
                  {title}
                </Text>
              </HStack>
              <IconButton
                variant="unstyled"
                _focus={{
                  borderWidth: 0,
                }}
                icon={<CloseIcon size="3" color="coolGray.600" />}
                onPress={() => setShow(false)}
              />
            </HStack>
            <Box
              pl="6"
              _dark={{
                _text: {
                  color: 'coolGray.600',
                },
              }}
            >
              {message}
            </Box>
          </VStack>
        </Alert>
      </Modal>
    </Box>
  );
}
