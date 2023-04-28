import { FormEvent, useEffect, useState } from "react";
import {
  LinkSimpleHorizontal,
  ArrowElbowDownLeft,
  CopySimple,
  CircleNotch,
} from "@phosphor-icons/react";

import Logo from "../assets/logo.svg";

import { useLazyGetSummaryQuery } from "../services/article";

import { Hero } from "./Hero";

type SummaryDataType = {
  summary: string;
  articleUrl: string;
};

export function Demo() {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    summary: "",
    articleUrl: "",
  });
  const [summaryList, setSummaryList] = useState<SummaryDataType[]>([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  function handleCopyToClipboard(articleUrl: string) {
    navigator.clipboard.writeText(articleUrl);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { data } = await getSummary({
      articleUrl: summaryData.articleUrl,
    });

    if (data?.summary) {
      const newSummary = { ...summaryData, summary: data.summary };
      const updatedSummaryList = [newSummary, ...summaryList];

      setSummaryData(newSummary);
      setSummaryList(updatedSummaryList);
      localStorage.setItem("summaries", JSON.stringify(updatedSummaryList));
    }
  }

  useEffect(() => {
    const summariesFromLocalStorage = JSON.parse(
      localStorage.getItem("summaries") as string
    );

    if (summariesFromLocalStorage) {
      setSummaryList(summariesFromLocalStorage);
    }
  }, []);

  return (
    <main className="md:px-[10%] mx-auto">
      <Hero />

      <section onSubmit={(event) => handleSubmit(event)}>
        <form>
          <div className="max-w-xl mx-auto mb-6 px-4 py-3 flex items-center justify-center gap-3 bg-white rounded-md drop-shadow-lg">
            <label htmlFor="url">
              <LinkSimpleHorizontal />
            </label>
            <input
              type="url"
              id="url"
              placeholder="https://..."
              value={summaryData.articleUrl}
              onChange={(event) =>
                setSummaryData({
                  ...summaryData,
                  articleUrl: event.target.value,
                })
              }
              required
              className="w-full outline-none peer"
            />

            <button
              type="submit"
              className="px-2 py-1 rounded-md hover:shadow-md peer-focus:shadow-md"
            >
              <ArrowElbowDownLeft />
            </button>
          </div>
        </form>

        {/* Summary List */}
        {summaryList.length > 0 && (
          <div className="max-w-xl mx-auto flex flex-col gap-2">
            {summaryList.map((item, index) => (
              <div
                key={`summary_${index}`}
                onClick={() => setSummaryData(item)}
                className="px-4 py-3 flex items-center justify-between rounded-md bg-white border shadow-sm hover:bg-gray-100 cursor-pointer group"
              >
                <span>{item.articleUrl}</span>
                <button
                  onClick={() => handleCopyToClipboard(item.articleUrl)}
                  className="px-2 py-1 rounded-md bg-gray-100 group-hover:shadow-md group-hover:bg-white transition-colors"
                >
                  <CopySimple />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Display Summary Result */}
        <div className="my-10">
          {isFetching ? (
            <div className="flex items-center justify-center">
              <CircleNotch className="animate-spin" />
            </div>
          ) : error ? (
            <span className="block font-medium text-center text-sm">
              Isso não era pra acontecer. Tente novamente mais tarde.
            </span>
          ) : (
            summaryData.summary && (
              <div>
                <div className="flex items-center gap-2">
                  <img src={Logo} className="w-5" />
                  <h3 className="font-extrabold text-3xl bg-gradient-to-r from-orange-theme to-amber-500 bg-clip-text text-transparent">
                    Resumo
                  </h3>
                </div>

                <div className="mt-3 px-5 py-4 bg-white/30 rounded-md shadow-lg">
                  <p className="text-justify font-medium text-gray-700">
                    {summaryData.summary}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
}
