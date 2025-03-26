import { Text } from 'react-native'

export const renderFormattedMessage = (message: string | undefined) => {
  const parts = message?.split(/(\*\*.*?\*\*)/g); // Tách các đoạn **in đậm**
  return parts?.map((part: any, index: number) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <Text key={index} style={{ fontWeight: "bold", color: "white", fontSize: 18 }}>
          {part.slice(2, -2)}
        </Text>
      );
    }
    return <Text key={index} style={{ color: "white" }}>{part}</Text>;
  });
};