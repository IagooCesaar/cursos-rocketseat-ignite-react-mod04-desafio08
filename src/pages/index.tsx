import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface ImagesQueryResponse {
  after?: {
    id: string;
  };
  data: {
    data: {
      title: string;
      description: string;
      url: string;
    };
    ts: number;
    ref: {
      id: string;
    };
  }[];
}

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

async function getImages({ pageParam = 0 }): Promise<ImagesQueryResponse> {
  const response = await api.get<ImagesQueryResponse>('/api/images', {
    params: {
      after: pageParam,
    },
  });
  return response.data;
}

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', getImages, {
    getNextPageParam: lastPage => lastPage.after?.id,
  });

  const formattedData = useMemo(() => {
    const cards: Card[] = [];
    data?.pages.forEach(page => {
      page.data.forEach(item => {
        const card = {} as Card;
        Object.assign(card, {
          id: item.ref.id,
          title: item.data.title,
          description: item.data.description,
          ts: item.ts,
          url: item.data.url,
        } as Card);
        cards.push(card);
      });
    });
    return cards;
  }, [data]);

  // TODO RENDER LOADING SCREEN

  // TODO RENDER ERROR SCREEN

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
      </Box>
    </>
  );
}
