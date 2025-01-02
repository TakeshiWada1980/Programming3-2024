"use client";
import { useState, ChangeEvent, useRef } from "react"; // ◀ 変更
import { useAuth } from "@/app/_hooks/useAuth";
import { supabase } from "@/utils/supabase";
import CryptoJS from "crypto-js";
import Image from "next/image";

const calculateMD5Hash = async (file: File): Promise<string> => {
  const buffer = await file.arrayBuffer();
  const wordArray = CryptoJS.lib.WordArray.create(buffer);
  return CryptoJS.MD5(wordArray).toString();
};

// ▼ 追加 : 引数で受け取った画像の「幅」と「高さ」を取得する非同期関数
const getImageSize = async (file: File) => {
  const img = document.createElement("img");
  // 画像のURLを作成してimg要素にセット
  img.src = URL.createObjectURL(file);
  // 画像の読み込み完了を待つ
  await img.decode();
  // オブジェクトURLを解放（メモリの解放）
  URL.revokeObjectURL(img.src);
  return {
    width: img.width,
    height: img.height,
  };
};

const Page: React.FC = () => {
  const bucketName = "cover_image";
  const [coverImageUrl, setCoverImageUrl] = useState<string | undefined>();
  const [coverImageKey, setCoverImageKey] = useState<string | undefined>();
  const { session } = useAuth();
  const hiddenFileInputRef = useRef<HTMLInputElement>(null); // ◀ 追加

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setCoverImageKey(undefined);
    setCoverImageUrl(undefined);

    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files?.[0];
    const fileHash = await calculateMD5Hash(file);
    const path = `private/${fileHash}`;

    // ▼ 追加 : 画像の「幅」と「高さ」を取得
    const imgSize = await getImageSize(file);

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(path, file, {
        upsert: true,
        // ▼ 追加 : 画像の「幅」と「高さ」をメタデータとして保存
        metadata: {
          width: imgSize.width, // 画像の幅
          height: imgSize.height, // 画像の高さ
        },
      });

    if (error || !data) {
      window.alert(`アップロードに失敗 ${error.message}`);
      return;
    }
    setCoverImageKey(data.path);
    const publicUrlResult = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);
    setCoverImageUrl(publicUrlResult.data.publicUrl);
  };

  if (!session) return <div>ログインしていません。</div>;

  return (
    <div>
      <input
        id="imgSelector"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        hidden={true}
        ref={hiddenFileInputRef}
      />
      <button
        onClick={() => hiddenFileInputRef.current?.click()}
        type="button"
        className="rounded-md bg-indigo-500 px-3 py-1 text-white"
      >
        ファイルを選択
      </button>
      <div className="break-all text-sm">coverImageKey : {coverImageKey}</div>
      <div className="break-all text-sm">coverImageUrl : {coverImageUrl}</div>
      {coverImageUrl && (
        <div className="mt-2">
          <Image
            className="w-1/2 border-2 border-gray-300"
            src={coverImageUrl}
            alt="プレビュー画像"
            width={1024}
            height={1024}
            priority
          />
        </div>
      )}
    </div>
  );
};

export default Page;
