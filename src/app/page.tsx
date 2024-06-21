'use client';

import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getCharacters, Character } from '../services/potterheadService';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      const data = await getCharacters();
      console.log('Fetched characters:', data); // Log fetched data
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
    <div className={styles.container}>
      <h1>Harry Potter Characters</h1>
      <ul className={styles.characterList}>
        {characters.map((character) => (
          <li key={character.id} onClick={() => openModal(character)} className={styles.characterItem}>
            {character.name}
          </li>
        ))}
      </ul>

      {selectedCharacter && (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <div className={styles.modalContent}>
            <h2>{selectedCharacter.name}</h2>
            {selectedCharacter.image && (
              <img src={selectedCharacter.image} alt={selectedCharacter.name} className={styles.characterImage} />
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
            <button onClick={closeModal} className={styles.closeButton}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Home;
