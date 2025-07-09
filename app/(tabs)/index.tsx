import React, { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Task = {
  id: string;
  text: string;
};

export default function HomeScreen() {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = () => {
    if (task.trim()) {
      const newTask: Task = { id: Date.now().toString(), text: task };
      setTasks((prev) => [...prev, newTask]);
      setTask('');
    }
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <View className="flex-1 bg-blue-50 px-6 pt-16">
      <Text className="text-2xl font-bold text-center text-blue-800 mb-6">
        📝 Tailwind To-Do
      </Text>

      <View className="flex-row items-center gap-2 mb-4">
        <TextInput
          className="flex-1 bg-white px-4 py-3 rounded-md border border-gray-300 text-base"
          placeholder="Enter a task"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity
          className="bg-blue-600 px-4 py-3 rounded-md"
          onPress={handleAddTask}
        >
          <Text className="text-white font-semibold">Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center bg-white border border-gray-300 rounded-md p-4 mb-2">
            <Text className="text-base text-gray-800">{item.text}</Text>
            <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
              <Text className="text-red-500 text-lg">❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
