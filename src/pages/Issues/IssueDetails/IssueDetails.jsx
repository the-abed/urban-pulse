import React from 'react';
import { MapPin, Clock, User, AlertCircle } from "lucide-react";
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';


const IssueDetails = () => {
    const {id} = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: issue = {}} = useQuery({
        queryKey: ['issue', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues/${id}`);
            return res.data;
        }
    })
      const {
    title,
    description,
    category,
    city,
    area,
    photoUrl,
    status,
    createdAt,
    displayName,
  } = issue;
   
    return (
        <div>
            {/* Issue details  */}
             {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Image Section */}
        <div className="lg:col-span-2">
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <img
              src={photoUrl}
              alt={title}
              className="w-full h-[360px] object-cover"
            />
            <span className="absolute top-4 left-4 badge badge-primary badge-lg">
              {category}
            </span>
          </div>
        </div>

        {/* Info Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body gap-4">
            <h2 className="card-title text-2xl">{title}</h2>

            <div className="flex items-center gap-2 text-sm text-base-content/70">
              <MapPin size={16} />
              {city}, {area}
            </div>

            <div className="flex items-center gap-2 text-sm text-base-content/70">
              <Clock size={16} />
              {new Date(createdAt).toLocaleDateString()}
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`badge ${
                  status === "pending"
                    ? "badge-warning"
                    : status === "resolved"
                    ? "badge-success"
                    : "badge-info"
                }`}
              >
                {status}
              </span>
            </div>

            <div className="divider" />

            <div className="flex items-center gap-3">
              <div className="avatar placeholder">
                <div className="bg-primary text-white rounded-full w-10">
                  <span>{displayName?.charAt(0)}</span>
                </div>
              </div>
              <div>
                <p className="font-medium">{displayName}</p>
                <p className="text-xs text-base-content/60">
                  Issue Reporter
                </p>
              </div>
            </div>

            <button className="btn btn-outline btn-primary w-full">
              Contact Authority
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <AlertCircle size={18} /> Description
            </h3>
            <p className="text-base-content/80 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="text-lg font-semibold">Issue Timeline</h3>

            <ul className="timeline timeline-vertical">
              <li>
                <div className="timeline-start text-xs opacity-70">
                  Created
                </div>
                <div className="timeline-middle bg-primary rounded-full" />
                <div className="timeline-end text-sm">
                  Issue reported
                </div>
              </li>
              <li>
                <div className="timeline-start text-xs opacity-70">
                  Review
                </div>
                <div className="timeline-middle bg-info rounded-full" />
                <div className="timeline-end text-sm">
                  Under review
                </div>
              </li>
              <li>
                <div className="timeline-start text-xs opacity-70">
                  Status
                </div>
                <div className="timeline-middle bg-success rounded-full" />
                <div className="timeline-end text-sm">
                  {status}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

        </div>
    );
};

export default IssueDetails;