export default function keyDownListener (listener: Function) {
  return (e: React.KeyboardEvent) => {
    if (/enter/i.test(e.key)) {
      listener();
    }
  };
}
