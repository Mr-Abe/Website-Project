/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { CreateGoalArgs } from "./CreateGoalArgs";
import { UpdateGoalArgs } from "./UpdateGoalArgs";
import { DeleteGoalArgs } from "./DeleteGoalArgs";
import { GoalFindManyArgs } from "./GoalFindManyArgs";
import { GoalFindUniqueArgs } from "./GoalFindUniqueArgs";
import { Goal } from "./Goal";
import { TrainingPlanFindManyArgs } from "../../trainingPlan/base/TrainingPlanFindManyArgs";
import { TrainingPlan } from "../../trainingPlan/base/TrainingPlan";
import { Exercise } from "../../exercise/base/Exercise";
import { GoalService } from "../goal.service";

@graphql.Resolver(() => Goal)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class GoalResolverBase {
  constructor(
    protected readonly service: GoalService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Goal",
    action: "read",
    possession: "any",
  })
  async _goalsMeta(
    @graphql.Args() args: GoalFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [Goal])
  @nestAccessControl.UseRoles({
    resource: "Goal",
    action: "read",
    possession: "any",
  })
  async goals(@graphql.Args() args: GoalFindManyArgs): Promise<Goal[]> {
    return this.service.findMany(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => Goal, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Goal",
    action: "read",
    possession: "own",
  })
  async goal(@graphql.Args() args: GoalFindUniqueArgs): Promise<Goal | null> {
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Goal)
  @nestAccessControl.UseRoles({
    resource: "Goal",
    action: "create",
    possession: "any",
  })
  async createGoal(@graphql.Args() args: CreateGoalArgs): Promise<Goal> {
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        exercise: args.data.exercise
          ? {
              connect: args.data.exercise,
            }
          : undefined,
      },
    });
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Goal)
  @nestAccessControl.UseRoles({
    resource: "Goal",
    action: "update",
    possession: "any",
  })
  async updateGoal(@graphql.Args() args: UpdateGoalArgs): Promise<Goal | null> {
    try {
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          exercise: args.data.exercise
            ? {
                connect: args.data.exercise,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Goal)
  @nestAccessControl.UseRoles({
    resource: "Goal",
    action: "delete",
    possession: "any",
  })
  async deleteGoal(@graphql.Args() args: DeleteGoalArgs): Promise<Goal | null> {
    try {
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [TrainingPlan])
  @nestAccessControl.UseRoles({
    resource: "TrainingPlan",
    action: "read",
    possession: "any",
  })
  async trainingPlans(
    @graphql.Parent() parent: Goal,
    @graphql.Args() args: TrainingPlanFindManyArgs
  ): Promise<TrainingPlan[]> {
    const results = await this.service.findTrainingPlans(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => Exercise, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Exercise",
    action: "read",
    possession: "any",
  })
  async exercise(@graphql.Parent() parent: Goal): Promise<Exercise | null> {
    const result = await this.service.getExercise(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }
}
