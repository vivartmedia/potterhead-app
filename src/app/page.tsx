'use client';

import { useEffect, useState } from 'react';
import { Modal } from 'flowbite-react';
import { getCharacters, Character } from '../services/potterheadService';
import styles from '../styles/Home.module.css';

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
    <div>
      <h1 className="text-2xl font-bold mb-4">Harry Potter Characters</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
        {characters.map((character) => (
          <div key={character.id} className="flex justify-center items-center flex-col w-48" onClick={() => openModal(character)}>
            <img src={character.image} alt={character.name} className=" w-48 h-56 overflow-hidden rounded-lg" />
            <p className="text-center mt-2">{character.name}</p>
          </div>
        ))}
      </div>

      {selectedCharacter && (
        <Modal show={modalIsOpen} onClose={closeModal}>
          <Modal.Header>{selectedCharacter.name}</Modal.Header>
          <Modal.Body>
            <div className="flex flex-col items-center">
              {selectedCharacter.image && (
                <img src={selectedCharacter.image} alt={selectedCharacter.name} className="w-32 h-32 mb-4 rounded-lg" />
              )}
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
          </Modal.Body>
          <Modal.Footer>
            <button onClick={closeModal} className="btn btn-primary">Close</button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Home;
