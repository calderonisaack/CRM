import React from 'react';
import s from './StatCard.module.css';

export const StatCard = ({ label, value, sub, icon, accent }) => {
  return (
    <div className={s.card} style={{ borderTop: `2px solid ${accent}` }}>
      <div className={s.content}>
        <span className={s.label}>{label}</span>
        <h3 className={s.value}>{value}</h3>
        <span className={s.sub}>{sub}</span>
      </div>
      <div className={s.icon} style={{ color: accent, background: `${accent}15` }}>
        {icon}
      </div>
    </div>
  );
};