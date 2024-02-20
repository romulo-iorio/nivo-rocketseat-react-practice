import { FileDown, Filter, MoreHorizontal, Plus, Search } from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

import {
  TableHeader,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
} from "./components/ui/table";
import { Control, Input } from "./components/ui/input";
import { Pagination } from "./components/pagination";
import { Button } from "./components/ui/button";
import { Header } from "./components/header";
import { Tabs } from "./components/tabs";
import useDebounceValue from "./hooks/use-debounce-value";
import * as Dialog from "@radix-ui/react-dialog";

interface Tag {
  title: string;
  amountOfVideos: number;
  id: string;
}

interface TagResponse {
  first: number;
  prev: number | null;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: Tag[];
}

export function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterFromUrl = searchParams.get("filter") ?? "";

  const [filter, setFilter] = useState(filterFromUrl);

  const debouncedFilter = useDebounceValue(filter, 1000);

  const page = searchParams.get("page") ?? "1";

  const handleFilter = () => {
    setSearchParams((params) => {
      params.set("filter", debouncedFilter);
      params.set("page", "1");
      return params;
    });
  };

  const { data: tagsResponse, isLoading } = useQuery<TagResponse>({
    queryKey: ["tags", page, filterFromUrl],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/tags?_page=${page}&_per_page=10&title=${debouncedFilter}`
      );
      return response.json();
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });

  if (isLoading || !tagsResponse) return null;

  const { data = [] } = tagsResponse;

  return (
    <div className="py-10 space-y-8">
      <div>
        <Header />

        <Tabs />
      </div>

      <main className="max-w-6xl mx-auto space-y-5">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Tags</h1>

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button variant="primary">
                <Plus className="size-3" /> Create new
              </Button>
            </Dialog.Trigger>
          </Dialog.Root>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/70">
              <Dialog.Content className="fixed right-0 top-0 bottom-0 h-screen min-w-[320px] z-10 bg-zinc-950 border-left border-zinc-900">
                <Dialog.Title className="text-xl font-bold">
                  Create Tag
                </Dialog.Title>
                <Dialog.Description className="text-sm text-zinc-500">
                  Tags can be used to group videos about similar concepts.
                </Dialog.Description>
                <Dialog.Close asChild />
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </div>

        <div className="flex items-center justify-between">
          <Input variant="filter">
            <Search className="size-3" />
            <Control
              onChange={(event) => setFilter(event.target.value)}
              placeholder="Search tags"
              value={filter}
            />

            <Button onClick={handleFilter}>
              <Filter className="size-3" />
              Filter
            </Button>
          </Input>

          <Button>
            <FileDown className="size-3" />
            Export
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              <TableHead>Tag</TableHead>
              <TableHead>Amount of videos</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((tag) => (
              <TableRow key={tag.id}>
                <TableCell />
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">{tag.title}</span>
                    <span className="text-xs text-zinc-500">{tag.id}</span>
                  </div>
                </TableCell>
                <TableCell className="text-zinc-300">
                  {tag.amountOfVideos} video(s)
                </TableCell>
                <TableCell className="text-right">
                  <Button size="icon">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {tagsResponse && (
          <Pagination
            pages={tagsResponse.pages}
            items={tagsResponse.items}
            page={Number(page)}
          />
        )}
      </main>
    </div>
  );
}
