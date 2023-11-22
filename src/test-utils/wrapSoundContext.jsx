import { SoundContext } from "../Context/SoundContext";

// wraps the sound context around component
const wrapSoundContext = (
  component,
  mockToggleSound = vi.fn(),
  sound = true
) => (
  <SoundContext.Provider value={{ sound: sound, toggleSound: mockToggleSound }}>
    {component}
  </SoundContext.Provider>
);

export default wrapSoundContext;
