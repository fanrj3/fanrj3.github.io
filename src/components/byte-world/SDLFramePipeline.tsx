'use client';

import { useState } from 'react';

const steps = [
  {
    label: '像素缓冲区',
    code: 'NumPy / BGR24',
    detail: 'CPU 光栅器把这一帧每个像素的 B、G、R 三个通道写入连续内存。',
  },
  {
    label: '更新纹理',
    code: 'SDL_UpdateTexture',
    detail: 'SDL 根据像素指针和每行字节数，把 CPU 缓冲区复制到 streaming texture。',
  },
  {
    label: '复制后台缓冲',
    code: 'SDL_RenderCopy',
    detail: '纹理按逻辑分辨率复制到 SDL 渲染器的后台缓冲区，并适配当前窗口尺寸。',
  },
  {
    label: '显示到窗口',
    code: 'SDL_RenderPresent',
    detail: '交换或提交后台缓冲区，当前帧才真正出现在屏幕上。',
  },
];

export default function SDLFramePipeline() {
  const [active, setActive] = useState(0);

  return (
    <div className="sdl-pipeline" aria-label="SDL 每帧呈现流程">
      <div className="sdl-pipeline-steps">
        {steps.map((step, index) => (
          <button
            type="button"
            key={step.code}
            className={index === active ? 'is-active' : ''}
            onClick={() => setActive(index)}
            aria-pressed={index === active}
          >
            <span>{index + 1}</span>
            {step.label}
          </button>
        ))}
      </div>
      <div className="sdl-pipeline-detail" aria-live="polite">
        <code>{steps[active].code}</code>
        <p>{steps[active].detail}</p>
      </div>
    </div>
  );
}
