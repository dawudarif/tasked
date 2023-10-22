import { useLazyQuery, useQuery } from '@apollo/client';
import { Stack } from '@chakra-ui/react';
import { GET_ALL_COLLECTIONS } from '../../../../graphql/Collection/queries';
import { ICollection } from '../../../../util/types';
import SingleCollection from './SingleCollection';
import { useEffect } from 'react';

const Collections: React.FC = () => {
  const [getCollections, { data }] =
    useLazyQuery<ICollection>(GET_ALL_COLLECTIONS);

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <Stack>
      {data?.getAllCollections.map((item) => (
        <SingleCollection collection={item} key={item.id} />
      ))}
    </Stack>
  );
};
export default Collections;
