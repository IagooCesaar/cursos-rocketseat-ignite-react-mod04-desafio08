import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

type AddNewImageFormData = {
  image: string;
  title: string;
  description: string;
};

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      // // TODO REQUIRED, LESS THAN 10 MB AND ACCEPTED FORMATS VALIDATIONS
      required: 'Imagem obrigatória',
      validate: {
        lessThen10MB: (fileList: FileList) => {
          if (fileList.length > 0) {
            //size is in bytes
            const maxSize = 1024 * 1024 * 10; // 10 MB
            console.log('size', fileList[0].size, maxSize);
            return (
              fileList[0].size <= maxSize ||
              'O arquivo deverá possuir no máximo 10MB'
            );
          }
          return true;
        },
        acceptedExtensions: (fileList: FileList) => {
          if (fileList.length > 0) {
            const regexExtensions = /image\//g;
            return (
              regexExtensions.test(fileList[0].type) ||
              'Apenas arquivos de imagem são permitidos'
            );
          }
          return true;
        },
      },
    },
    title: {
      required: 'Você deve informar um título',
      minLength: {
        value: 2,
        message: 'O título deverá conter no mínimo 2 caracteres',
      },
      maxLength: {
        value: 20,
        message: 'O título deverá conter no máximo 20 caracteres',
      },
    },
    description: {
      required: 'Você deve informar a descrição',
      maxLength: {
        value: 20,
        message: 'A descrição deverá possuir no máximo 20 caracteres',
      },
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (data: AddNewImageFormData) => {
      const newImageData = {
        ...data,
        url: imageUrl,
      };
      const response = await api.post('/api/images', newImageData);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('images');
      },
    }
  );

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS
      // TODO EXECUTE ASYNC MUTATION
      // TODO SHOW SUCCESS TOAST
    } catch (error) {
      toast({
        title: 'Erro ao cadastrar nova imagem',
        description: `Ocorreu um erro ao cadastrar uma nova imagem: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      reset();
      setLocalImageUrl('');
      setImageUrl('');
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          error={errors.image}
          {...register('image', formValidations.image)}
        />

        <TextInput
          placeholder="Título da imagem..."
          error={errors.title}
          {...register('title', formValidations.title)}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          error={errors.description}
          {...register('description', formValidations.description)}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
