import { useCoverContext } from '../coverContext';

const Description = () => {
  const { description, setDescription } = useCoverContext();
  return (
    <div>
      <label htmlFor="description">Тэмдэглэл</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        id="description"
      />
    </div>
  );
};

export default Description;
