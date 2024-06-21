'use client';

import { useEffect, useState } from 'react';
import { Modal } from 'flowbite-react';
import { getCharacters } from '../services/potterheadService';
import { Character } from '../../Interfaces/Interfaces';

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      const data = await getCharacters();
      setCharacters(data);
    };
    fetchCharacters();
  }, []);

  const openModal = (character: Character) => {
    setSelectedCharacter(character);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
    setModalIsOpen(false);
  };

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Harry Potter Characters</h1>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
        {characters.map((character) => (
          <div key={character.id} className="cursor-pointer flex justify-center items-center flex-col w-48" onClick={() => openModal(character)}>
                        <div className="w-48 h-72  overflow-hidden rounded-lg shadow-lg transition-transform duration-200 ease-in-out transform hover:scale-110 hover:shadow-xl">
            <img src={character.image} alt={character.name} className= "object-cover w-full h-full" />

            </div>
            <p className="text-center mt-2">{character.name}</p>
          </div>
        ))}
      </div>

      {selectedCharacter && (
        <Modal show={modalIsOpen} onClose={closeModal} className=''>
          <Modal.Header className='bg-slate-500'>{selectedCharacter.name}</Modal.Header>
          <Modal.Body className='bg-slate-500'>
            
            <div className="flex gap-8 items-center bg-slate-800 rounded-xl">
             
              <div>
              {selectedCharacter.image && (
                <img src={selectedCharacter.image} alt={selectedCharacter.name} className="w-64 mb-4 rounded-lg" />
              )}
              </div>
              <div>
              <p><strong>House:</strong> {selectedCharacter.house}</p>
              <p><strong>Species:</strong> {selectedCharacter.species}</p>
              <p><strong>Gender:</strong> {selectedCharacter.gender}</p>
              <p><strong>Date of Birth:</strong> {selectedCharacter.dateOfBirth}</p>
              <p><strong>Ancestry:</strong> {selectedCharacter.ancestry}</p>
              <p><strong>Eye Colour:</strong> {selectedCharacter.eyeColour}</p>
              <p><strong>Hair Colour:</strong> {selectedCharacter.hairColour}</p>
              <p><strong>Patronus:</strong> {selectedCharacter.patronus}</p>
              <p><strong>Actor:</strong> {selectedCharacter.actor}</p>
              {selectedCharacter.wand && (
                <>
                  <p><strong>Wand:</strong></p>
                  <p><strong>Wood:</strong> {selectedCharacter.wand.wood}</p>
                  <p><strong>Core:</strong> {selectedCharacter.wand.core}</p>
                  <p><strong>Length:</strong> {selectedCharacter.wand.length}</p>
                </>
              )}
              </div>
              
            </div>
          </Modal.Body>
          <Modal.Footer  className='bg-slate-500'>
            <button onClick={closeModal} className="btn btn-primary">Close</button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Home;
