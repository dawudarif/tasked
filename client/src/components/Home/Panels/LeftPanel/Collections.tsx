import { useQuery } from '@apollo/client';
import { Stack } from '@chakra-ui/react';
import { GET_ALL_COLLECTIONS } from '../../../../graphql/Collection/queries';
import { ICollection } from '../../../../util/types';
import SingleCollection from './SingleCollection';

const Collections: React.FC = () => {
  const { data } = useQuery<ICollection>(GET_ALL_COLLECTIONS);

  return (
    <Stack>
      {data?.getAllCollections.map((item) => (
        <SingleCollection collection={item} key={item.id} />
      ))}
    </Stack>
  );
};
export default Collections;
