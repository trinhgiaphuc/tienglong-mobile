import * as React from 'react';
import { Text, View, Pressable, TextInput, Share } from 'react-native';
import Modal from 'react-native-modal';
import { reportWord } from '../../firebase/api';

export default function ShareAndReport({ wordId }: { wordId: string }) {
  const [showModal, setShowModal] = React.useState(false);

  function handleShare() {
    Share.share({ title: "TiengLong", message: `https://tienglong.vercel.app/word/${wordId}`, url: `https://tienglong.vercel.app/word/${wordId}` }, { dialogTitle: "TiengLong" });
  }

  return (
    <View className="absolute -bottom-6 -left-5 flex p-2 justify-center flex-row">
      {showModal ? <ReportModal wordId={wordId} showModal={showModal} setShowModal={setShowModal} /> : null}
      <Pressable onPress={handleShare} className="border-2 border-slate-900  border-r-0 bg-blue-400 py-2 px-4 rounded-l-full active:bg-blue-500">
        <Text className="text-white font-semibold text-sm">🧷 Chia Sẽ</Text>
      </Pressable>
      <Pressable onPress={() => setShowModal(true)} className="border-2 border-slate-900  bg-red-400 p-2 rounded-r-full active:bg-red-500 ">
        <Text className="text-white font-semibold text-sm">✖ Báo Cáo</Text>
      </Pressable>
    </View>);
}


type ReportModalPropsType = {
  wordId: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReportModal({ wordId, showModal, setShowModal }: ReportModalPropsType) {
  const [message, setMessage] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  function handleReportWord() {
    if (message.length === 0) {
      setShowModal(false);
    } else {
      reportWord(wordId, message)
      setSuccess(true);
    }
  }

  return <Modal isVisible={showModal}>
    {!success ?
      <View className="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md">
        <Text className="mt-8 pt-4 text-center text-3xl font-bold text-gray-700">Báo Cáo Định Nghĩa</Text>
        <Text className="p-4 text-center text-base text-gray-700">Xin cho chúng tôi biết vì sao bạn muốn báo cáo định nghĩa này</Text>
        <View className="py-2 px-4">
          <TextInput onChangeText={value => setMessage(value)} multiline={true} numberOfLines={4} textAlignVertical="top" className="bg-white p-3 rounded-lg border-2 border-slate-900" />
        </View>
        <View className="space-x-4 mx-auto py-4 text-center flex flex-row">
          <Pressable onPress={() => setShowModal(false)}
            className="inline-block rounded-md bg-zinc-500 py-2 px-4 mr-2 font-semibold text-green-100">
            <Text className="text-base">
              Hủy Bỏ
            </Text>
          </Pressable>
          <Pressable onPress={handleReportWord} className="inline-block rounded-md bg-red-500 py-2 px-4 ml-2">
            <Text className="text-base">
              Báo Cáo
            </Text>
          </Pressable>
        </View>
      </View>
      :
      <View className="w-full max-w-sm overflow-hidden p-4 rounded-lg bg-white shadow-md">
        <Text className="mt-8 p-2 text-center text-3xl font-bold text-gray-700">Thành Công</Text>
        <Text className="p-2 text-center text-base text-gray-700">Cảm ơn bạn đã báo cáo.</Text>
        <Pressable onPress={() => {
          setSuccess(false);
          setShowModal(false);
        }}
          className="rounded-md bg-green-500 p-4 mt-4 w-32 mx-auto font-semibold text-green-100">
          <Text className="text-lg text-center">
            Được
          </Text>
        </Pressable>
      </View>
    }
  </Modal>
}
