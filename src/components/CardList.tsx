import { SimpleGrid, useDisclosure, useBreakpointValue } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE

  // TODO SELECTED IMAGE URL STATE

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(imageUrl: string): void {
    // modal para visualizar imagem
  }

  const columnsCount = useBreakpointValue({
    base: 3,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  });
  return (
    <>
      {/* TODO CARD GRID */}
      <SimpleGrid columns={columnsCount}>
        {cards.map(card => (
          <Card key={card.id} data={card} viewImage={handleViewImage} />
        ))}
      </SimpleGrid>

      {/* TODO MODALVIEWIMAGE */}
    </>
  );
}
