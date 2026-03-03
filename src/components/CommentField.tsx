import Button from './Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { approveProposal } from '../app/(frontend)/proposals/[id]/actions';
import { declineProposal } from '../app/(frontend)/proposals/[id]/actions';
interface CommentFieldProps {
  sendButton?: boolean;
  approveButtons?: boolean;
  title?: string;
  proposalId: number;
}

export default function CommentField({
  sendButton = false,
  approveButtons = false,
  title = 'Согласование',
  proposalId,
}: CommentFieldProps) {
  const router = useRouter();
  const [isApproving, setIsApproving] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);
  const [comment, setComment] = useState<string>(' ');

  const handleApprove = async () => {
    if (!confirm('Вы уверены, что хотите утвердить это КП?')) return;
    const trimmed = comment.trim();

    setIsApproving(true);
    const result = await approveProposal(proposalId, trimmed);
    setIsApproving(false);
    if (result.success) {
      alert('КП утверждено');
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  const handleDecline = async () => {
    if (!confirm('Вы уверены, что хотите отклонить это КП?')) return;
    const trimmed = comment.trim();

    setIsDeclining(true);
    const result = await declineProposal(proposalId, trimmed);
    setIsDeclining(false);
    if (result.success) {
      alert('КП отклонено');
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="bg-white text-card-foreground flex flex-col gap-6 rounded-xl border border-accent">
      <h4 className="leading-none font-semibold px-6 pt-6">{title}</h4>

      <div className="px-6 pb-6 space-y-4">
        <div>
          <label className="text-sm font-medium">Ваш комментарий</label>
          <textarea
            className="resize-none placeholder:text-muted focus-visible:border focus-visible:border-2 focus-visible:border-muted flex field-sizing-content min-h-16 w-full rounded-md bg-secondary px-3 py-2 text-base transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 mt-1"
            id="comment"
            placeholder="Оставьте комментарий..."
            value={comment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setComment(e.target.value)
            }
            disabled={isApproving}
          ></textarea>
        </div>

        <div className="flex justify-start gap-2">
          {sendButton === true && (
            <div>
              <button
                onClick={handleApprove}
                disabled={isApproving}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none h-9 px-4 py-2 bg-green-600 hover:bg-green-700 text-white"
              >
                Отправить на согласование
              </button>
              {/*можно добавить еще кнопку удаления черновика, но не вижу такого запроса, поэтому пока удалить нельзя*/}
            </div>
          )}

          {approveButtons === true && (
            <div className="flex gap-2">
              <button
                onClick={handleApprove}
                disabled={isApproving}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none h-9 px-4 py-2 bg-green-600 hover:bg-green-700 text-white"
              >
                Согласовать
              </button>
              <button
                onClick={handleDecline}
                disabled={isDeclining}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none border bg-background h-9 px-4 py-2 border-red-200 text-red-600 hover:bg-red-50"
              >
                Отклонить
              </button>
            </div>
          )}

          <Button
            variant="outline"
            onClick={() => setComment('')}
            disabled={isApproving}
            label="Очистить поле"
            className="text-sm"
          ></Button>
        </div>
      </div>
    </div>
  );
}
