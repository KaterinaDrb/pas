import React from 'react';
import { LuNotebookPen } from 'react-icons/lu';
import { ImCross, ImCheckmark } from 'react-icons/im';
import { FaPencilAlt } from 'react-icons/fa';
import { FaRegCommentAlt } from 'react-icons/fa';
import { useAuth } from '@payloadcms/ui';
import { LuMailCheck } from 'react-icons/lu';

interface ApprovalRibbonProps {
  id: number;
  date: string;
  name?: string;
  oldStatus?: string | null | undefined;
  newStatus?: string | null | undefined;
  comment?: string | null | undefined;
}

export default function ApprovalRibbon({
  id,
  date,
  name,
  oldStatus,
  newStatus,
  comment,
}: ApprovalRibbonProps) {
  return (
    <div>
      <div className="flex items-center gap-3">
        {newStatus === 'DECLINED' && (
          <div className="flex-shrink-0 w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-xs">
            <ImCross color="red" />
          </div>
        )}
        {(newStatus === 'TECH_APPROVED' || newStatus === 'APPROVED') && (
          <div className="flex-shrink-0 w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-xs">
            <ImCheckmark color="green" />
          </div>
        )}
        {newStatus === 'READY' && (
          <div className="flex-shrink-0 w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-xs">
            <LuMailCheck color="green" />
          </div>
        )}
        {!newStatus && (
          <div className="flex-shrink-0 w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-xs">
            <LuNotebookPen color="brown" />
          </div>
        )}

        <p className="text-sm">
          {date}: {name}{' '}
          {newStatus === 'APPROVED' && `(зам.директора) - согласовал`}
          {newStatus === 'TECH_APPROVED' && `(тех.лид.) - согласовал`}
          {newStatus === 'READY' && `отправил черновик на согласование`}
          {newStatus === 'DECLINED' && `отклонил`}
          {!newStatus && `создал черновик`}
        </p>
      </div>

      {comment && (
        <div className="p-2 flex gap-2 items-center bg-pending rounded border border-pending-1 mx-9 my-2">
          <FaRegCommentAlt />
          <p className="text-sm">Комментарий пользователя: {comment}</p>
        </div>
      )}
    </div>
  );
}
